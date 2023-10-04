package com.app.bicycle.service;

import com.app.bicycle.entities.Price;


public interface PaymentService {
    String encrypt(String input) throws Exception;

    Price getCurrentPrices();
}
