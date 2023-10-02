package com.app.bicycle.entities;

import com.app.bicycle.enums.BicycleState;
import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Bicycle extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private BicycleState state;

    @Column(name = "battery_level", nullable = false)
    private Integer batteryLevel;

    @Column(name = "active_flag", columnDefinition = "BIT(1) default 1", nullable = false)
    private Boolean activeFlag;

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.EAGER)
    private List<FaultReport> faultReports = new ArrayList<>();

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Rental> rentals = new ArrayList<>();

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.LAZY, cascade  = CascadeType.PERSIST)
    private List<Reservation> reservations = new ArrayList<>();

    @Transient
    private Double distance = 0.0;

    public BicycleState getState() {
        return state;
    }

    public void setState(BicycleState state) {
        this.state = state;
    }

    public Integer getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    public Boolean getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<FaultReport> getFaultReports() {
        return faultReports;
    }

    public void setFaultReports(List<FaultReport> faultReports) {
        this.faultReports = faultReports;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }
}
