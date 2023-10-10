package com.app.bicycle.dto;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.User;

import java.sql.Date;

public class FaultReportDTO {

    private Bicycle bicycle;
    private User user;
    private String faultText;
    private Date date;
    private String imageData;

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

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
}

