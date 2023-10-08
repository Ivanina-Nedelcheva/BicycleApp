package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Price;
import com.app.bicycle.repositories.PriceRepository;
import com.app.bicycle.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PriceRepository priceRepository;

    @Value("${ENCODE_KEY}")
    private String encodeKey;

    public PaymentServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public String encrypt(String input) throws Exception {
        String secretKey = encodeKey;
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);

        byte[] encryptedBytes = cipher.doFinal(input.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    @Override
    public Price getCurrentPrices() {
        return priceRepository.findTopByOrderByIdDesc();
    }
}