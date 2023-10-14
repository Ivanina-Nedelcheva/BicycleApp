package com.app.bicycle.service;

import com.app.bicycle.entities.Price;

import java.util.Map;

public interface PaymentService {
    Price getCurrentPrices();

    Map<String, String> paymentSheet(Long userId, String paymentMethodId);

    Map<String, Object> chargeSavedPaymentMethod(String customerId, Long amount);
}
