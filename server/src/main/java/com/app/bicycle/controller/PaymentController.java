package com.app.bicycle.controller;

import com.app.bicycle.entities.Price;
import com.app.bicycle.entities.User;
import com.app.bicycle.repositories.UserRepository;
import com.app.bicycle.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("payment")
public class PaymentController {

    private final PaymentService paymentsService;
    private final UserRepository userRepository;

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    public PaymentController(PaymentService paymentsService, UserRepository userRepository) {
        this.paymentsService = paymentsService;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/paymentSheet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public Map<String, String> handlePaymentSheet(@RequestParam Long userId, @RequestParam String paymentMethodId) throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        User currentUser = userRepository.getUserById(userId);

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

//    @RequestMapping(value = "/attachPaymentMethod", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
//        public ResponseEntity<String> attachPaymentMethodToCustomer(@RequestParam String paymentMethodId, @RequestParam String stripeId) {
//            try {
//                Stripe.apiKey = stripeSecretKey;
//                PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
//                PaymentMethod updatedPaymentMethod = paymentMethod.attach(PaymentMethodAttachParams.builder().setCustomer(stripeId).build());
//                return new ResponseEntity<>(updatedPaymentMethod.getId(), HttpStatus.OK);
//            } catch (StripeException e) {
//                e.printStackTrace();
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//    }


    @RequestMapping(value = "/chargeSavedPaymentMethod", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public Map<String, Object> chargeSavedPaymentMethod(@RequestParam String customerId, @RequestParam Long amount) {
        Map<String, Object> responseData = new HashMap<>();

        try {
            Stripe.apiKey = stripeSecretKey;

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
                        .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build())
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

    @RequestMapping(method = RequestMethod.GET, value = "/getPrices", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<com.app.bicycle.entities.Price> getPrices() {
        Price result;
        try {
            result = paymentsService.getCurrentPrices();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
