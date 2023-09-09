package com.app.bicycle.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@Entity
public class Prices extends BaseEntity {
    @Column(name = "unlock_price")
    Double unlockPrice;

    @Column(name = "minute_price")
    Double minutePrice;

    @Column(name = "start_date")
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
