package com.app.bicycle.dto;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Date;

public class FaultReportDTO {

    private Long bikeId;

    private Long userId;

    private String faultText;
    private Date date;

    public Long getBikeId() {
        return bikeId;
    }

    public void setBikeId(Long bikeId) {
        this.bikeId = bikeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

