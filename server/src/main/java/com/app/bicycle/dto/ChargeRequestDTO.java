package com.app.bicycle.dto;

import lombok.Data;

@Data
public class ChargeRequestDTO {
    public enum Currency {
        BGN
    }

    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
}
