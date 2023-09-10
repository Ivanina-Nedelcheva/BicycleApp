package com.app.bicycle.entities;


import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class FaultReport extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "bike_id")
    private Bicycle bicycle;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String faultText;

    @Column
    private Date date;

    @Lob
    private byte[] imageData;

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

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
