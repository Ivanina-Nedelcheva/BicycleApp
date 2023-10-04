package com.app.bicycle.controller;

import com.app.bicycle.entities.Price;
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
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("payment")
public class PaymentController {

    private final PaymentService paymentsService;

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    public PaymentController(PaymentService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @RequestMapping(value = "/payment-sheet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public Map<String, String> handlePaymentSheet() {

        Stripe.apiKey = stripeSecretKey;

        CustomerCreateParams customerParams = CustomerCreateParams.builder().build();
        Customer customer = null;
        try {
            customer = Customer.create(customerParams);
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

    @RequestMapping(value = "/charge-saved-payment-method", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    //@PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)") // Uncomment this line if you want to secure this endpoint
    public Map<String, Object> chargeSavedPaymentMethod(@RequestBody Map<String, String> payload) {
        Map<String, Object> responseData = new HashMap<>();

        try {
            Stripe.apiKey = stripeSecretKey;

            String customerId = payload.get("customer");

            PaymentMethodListParams params = PaymentMethodListParams.builder()
                    .setCustomer(customerId)
                    .setType(PaymentMethodListParams.Type.CARD)
                    .build();
            PaymentMethodCollection paymentMethods = PaymentMethod.list(params);

            if (!paymentMethods.getData().isEmpty()) {
                String paymentMethodId = paymentMethods.getData().get(0).getId();

                PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                        .setCurrency("bgn")
                        .setAmount(1099L)
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
