package com.app.bicycle.controller;

import com.app.bicycle.dto.ChargeRequestDTO;
import com.app.bicycle.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("app/payment")
public class CardController {

    @Value("${STRIPE_PUBLIC_KEY}")
    private String stripePublicKey;

    private final StripeService paymentsService;

    public CardController(StripeService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/checkout", produces = MediaType.APPLICATION_JSON_VALUE)
    public Model checkout(Model model, Double price) {
        model.addAttribute("amount", price);
        model.addAttribute("stripePublicKey", stripePublicKey);
        model.addAttribute("currency", ChargeRequestDTO.Currency.BGN);
        return model;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/charge", produces = MediaType.APPLICATION_JSON_VALUE)
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
}
