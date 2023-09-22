package com.app.bicycle.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ChargeRequestDTO {
    public enum Currency {
        BGN
    }
    private String description;
    private BigDecimal amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
}
