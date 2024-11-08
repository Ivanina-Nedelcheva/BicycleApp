package com.app.bicycle.dto;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.User;

import java.math.BigDecimal;
import java.util.Date;

public class RentalDTO {
    Date date;
    Double distance;
    BigDecimal price;
    Boolean finished;
    private Long id;
    private User user;
    private Bicycle bicycle;
    private StationDTO station;
    private Double minutes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Bicycle getBicycle() {
        return bicycle;
    }

    public void setBicycle(Bicycle bicycle) {
        this.bicycle = bicycle;
    }

    public Double getMinutes() {
        return minutes;
    }

    public void setMinutes(Double minutes) {
        this.minutes = minutes;
    }

    public StationDTO getStation() {
        return station;
    }

    public void setStation(StationDTO station) {
        this.station = station;
    }
}
