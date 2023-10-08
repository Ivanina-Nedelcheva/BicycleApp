package com.app.bicycle.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Station extends BaseEntity {
    @Column(name = "station_name", nullable = false)
    private String stationName;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "active_flag", columnDefinition = "BIT(1) default 1", nullable = false)
    private Boolean activeFlag;

    @OneToMany(mappedBy = "station", fetch = FetchType.EAGER)
    private List<StationBicycle> stationBicycles = new ArrayList<>();

    @OneToMany(mappedBy = "station", fetch = FetchType.EAGER)
    private List<Rental> rentals = new ArrayList<>();

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Boolean getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
    }

    public List<StationBicycle> getStationBicycles() {
        return stationBicycles;
    }

    public void setStationBicycles(List<StationBicycle> stationBicycles) {
        this.stationBicycles = stationBicycles;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }
}
