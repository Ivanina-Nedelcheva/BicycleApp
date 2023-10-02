package com.app.bicycle.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

import java.sql.Date;

@Entity
public class FaultReport extends BaseEntity {
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bike_id", nullable = false)
    private Bicycle bicycle;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String faultText;

    @Column(nullable = false)
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
