package com.app.bicycle.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "Station_Bicycle", uniqueConstraints = @UniqueConstraint(columnNames = "bike_id"))
public class StationBicycle extends BaseEntity {
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bike_id", nullable = false)
    private Bicycle bicycle;

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public Bicycle getBicycle() {
        return bicycle;
    }

    public void setBicycle(Bicycle bicycle) {
        this.bicycle = bicycle;
    }
}
