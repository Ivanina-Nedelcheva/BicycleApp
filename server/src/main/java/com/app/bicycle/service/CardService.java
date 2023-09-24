package com.app.bicycle.service;


import com.app.bicycle.dto.ChargeRequestDTO;
import com.app.bicycle.entities.Price;
import com.stripe.exception.*;
import com.stripe.model.Charge;


public interface CardService {
    Charge charge(ChargeRequestDTO chargeRequest) throws AuthenticationException, InvalidRequestException,
            APIConnectionException, CardException, APIException;

    String encrypt(String input) throws Exception;

    Price getCurrentPrices();
}
