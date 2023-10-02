package com.app.bicycle.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.util.Date;

@Entity
public class Price extends BaseEntity {
    @Column(name = "unlock_price", nullable = false)
    Double unlockPrice;

    @Column(name = "minute_price", nullable = false)
    Double minutePrice;

    @Column(name = "start_date", nullable = false)
    Date startDate;

    public Double getUnlockPrice() {
        return unlockPrice;
    }

    public void setUnlockPrice(Double unlockPrice) {
        this.unlockPrice = unlockPrice;
    }

    public Double getMinutePrice() {
        return minutePrice;
    }

    public void setMinutePrice(Double minutePrice) {
        this.minutePrice = minutePrice;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
}
