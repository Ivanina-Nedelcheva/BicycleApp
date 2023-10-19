package com.app.bicycle.service;

import com.app.bicycle.entities.Price;

import java.util.Map;

public interface PaymentService {
    Price getCurrentPrices();

    Map<String, String> paymentSheet(Long userId);

    Map<String, Object> chargeSavedPaymentMethod(String customerId, String paymentMethodId, Long amount);
}
