package com.app.bicycle.entities;

import javax.persistence.*;

@Entity
@Table(name = "Station_Bicycle", uniqueConstraints = @UniqueConstraint(columnNames = "bicycle_id"))
public class StationBicycle extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    @ManyToOne
    @JoinColumn(name = "bicycle_id")
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
