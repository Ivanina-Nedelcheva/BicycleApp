package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Price;
import com.app.bicycle.entities.User;
import com.app.bicycle.repositories.PriceRepository;
import com.app.bicycle.repositories.UserRepository;
import com.app.bicycle.service.PaymentService;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PriceRepository priceRepository;
    private final UserRepository userRepository;

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    public PaymentServiceImpl(PriceRepository priceRepository, UserRepository userRepository) {
        this.priceRepository = priceRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Price getCurrentPrices() {
        return priceRepository.findTopByOrderByIdDesc();
    }

    @Override
    public Map<String, String> paymentSheet(Long userId, String paymentMethodId) {
        User currentUser = userRepository.findUserById(userId);
        CustomerCreateParams customerParams = CustomerCreateParams.builder()
                .setName(currentUser.getFirstName() + " " + currentUser.getLastName())
                .setEmail(currentUser.getEmail())
                .build();

        Customer customer = null;
        try {
            customer = Customer.create(customerParams);
            currentUser.setStripeId(customer.getId());
            userRepository.save(currentUser);
        } catch (Exception e) {
            e.printStackTrace();
        }

        EphemeralKeyCreateParams ephemeralKeyParams = EphemeralKeyCreateParams.builder()
                .setStripeVersion("2023-08-16")
                .setCustomer(customer.getId())
                .build();

        EphemeralKey ephemeralKey = null;
        try {
            ephemeralKey = EphemeralKey.create(ephemeralKeyParams);
        } catch (Exception e) {
            e.printStackTrace();
        }

        SetupIntentCreateParams setupIntentParams = SetupIntentCreateParams.builder()
                .setCustomer(customer.getId())
                .setPaymentMethod(paymentMethodId)
                .build();
        SetupIntent setupIntent = null;
        try {
            setupIntent = SetupIntent.create(setupIntentParams);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Map<String, String> responseData = new HashMap<>();
        responseData.put("setupIntent", setupIntent.getClientSecret());
        responseData.put("ephemeralKey", ephemeralKey.getSecret());
        responseData.put("customer", customer.getId());
        responseData.put("publishableKey", stripePublicKey);

        return responseData;
    }

    @Override
    public Map<String, Object> chargeSavedPaymentMethod(String customerId, Long amount) {

        Map<String, Object> responseData = new HashMap<>();
        try {
            PaymentMethodListParams params = PaymentMethodListParams.builder()
                    .setCustomer(customerId)
                    .setType(PaymentMethodListParams.Type.CARD)
                    .build();
            PaymentMethodCollection paymentMethods = PaymentMethod.list(params);

            if (!paymentMethods.getData().isEmpty()) {
                String paymentMethodId = paymentMethods.getData().get(0).getId();

                PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                        .setCurrency("bgn")
                        .setAmount(amount)
                        .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build())
                        .setCustomer(customerId)
                        .setPaymentMethod(paymentMethodId)
                        .setConfirm(true)
                        .setOffSession(true)
                        .build();

                PaymentIntent intent = PaymentIntent.create(createParams);
                responseData.put("paymentIntent", intent);
            } else {
                responseData.put("error", "No payment method found");
            }
        } catch (CardException e) {
            responseData.put("error", "Error code is : " + e.getCode());
        } catch (StripeException e) {
            e.printStackTrace();
            responseData.put("error", "Stripe exception occurred");
        }
        return responseData;
    }


}