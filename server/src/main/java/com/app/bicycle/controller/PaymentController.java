package com.app.bicycle.controller;

import com.app.bicycle.entities.Price;
import com.app.bicycle.service.PaymentService;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("payment")
public class PaymentController {

    private final PaymentService paymentsService;
    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    public PaymentController(PaymentService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @PostMapping("/paymentSheet")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<Map<String, String>> handlePaymentSheet(@RequestParam Long userId, @RequestParam String paymentMethodId) {

        Map<String, String> response;
        try {
            Stripe.apiKey = stripeSecretKey;
            response = paymentsService.paymentSheet(userId, paymentMethodId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/chargeSavedPaymentMethod")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<Map<String, Object>> chargeSavedPaymentMethod(@RequestParam String customerId, @RequestParam Long amount) {
        Map<String, Object> response;
        try {
            Stripe.apiKey = stripeSecretKey;
            response = paymentsService.chargeSavedPaymentMethod(customerId, amount);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getPrices")
    public ResponseEntity<com.app.bicycle.entities.Price> getPrices() {
        Price response;
        try {
            response = paymentsService.getCurrentPrices();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
