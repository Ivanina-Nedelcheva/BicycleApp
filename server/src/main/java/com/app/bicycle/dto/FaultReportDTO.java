package com.app.bicycle.dto;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Date;

public class FaultReportDTO {

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Bicycle bicycle;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    private String faultText;
    private Date date;

    public Bicycle getBicycle() {
        return bicycle;
    }

    public void setBicycle(Bicycle bicycle) {
        this.bicycle = bicycle;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFaultText() {
        return faultText;
    }

    public void setFaultText(String faultText) {
        this.faultText = faultText;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

