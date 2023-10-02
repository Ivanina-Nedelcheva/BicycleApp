package com.app.bicycle.controller;

import com.app.bicycle.dto.ChargeRequestDTO;
import com.app.bicycle.entities.Price;
import com.app.bicycle.service.CardService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("app/payment")
public class CardController {

    private final CardService paymentsService;

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    public CardController(CardService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/checkout", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public Model checkout(Model model, Double price) {
        model.addAttribute("amount", price);
        model.addAttribute("stripePublicKey", stripePublicKey);
        model.addAttribute("currency", ChargeRequestDTO.Currency.BGN);
        return model;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/charge", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public Model charge(ChargeRequestDTO chargeRequest, Model model)
            throws StripeException {
        chargeRequest.setDescription("Example charge");
        chargeRequest.setCurrency(ChargeRequestDTO.Currency.BGN);
        Charge charge = paymentsService.charge(chargeRequest);
        model.addAttribute("id", charge.getId());
        model.addAttribute("status", charge.getStatus());
        model.addAttribute("chargeId", charge.getId());
        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
        return model;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getPrices", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Price> getPrices() {
        Price result;
        try {
            result = paymentsService.getCurrentPrices();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
