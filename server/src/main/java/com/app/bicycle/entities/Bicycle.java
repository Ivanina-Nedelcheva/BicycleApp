package com.app.bicycle.entities;

import com.app.bicycle.enums.BicycleState;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Bicycle extends BaseEntity {
    @Enumerated(value = EnumType.STRING)
    @Column
    private BicycleState state;

    @Column(name = "battery_level")
    private Integer batteryLevel;

    @Column(name = "damage_flag", columnDefinition = "BIT(1) default 0")
    private Boolean damageFlag;

    @Column(name = "active_flag", columnDefinition = "BIT(1) default 1")
    private Boolean activeFlag;

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<FaultReport> faultReports = new ArrayList<>();

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Rental> rentals = new ArrayList<>();

    @OneToMany(mappedBy = "bicycle", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Reservation> reservations = new ArrayList<>();

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

    public Boolean getDamageFlag() {
        return damageFlag;
    }

    public void setDamageFlag(Boolean damageFlag) {
        this.damageFlag = damageFlag;
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
}
