package com.app.bicycle.service;


import com.app.bicycle.dto.ChargeRequestDTO;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.*;
import com.stripe.model.Charge;


public interface StripeService {
    Charge charge(ChargeRequestDTO chargeRequest) throws AuthenticationException, InvalidRequestException,
            APIConnectionException, CardException, APIException;

    String encrypt(String input) throws Exception;
}
