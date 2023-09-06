package com.app.bicycle.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Station extends BaseEntity {
    @Column(name = "station_name")
    private String stationName;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column(name = "active_flag", columnDefinition = "BIT(1) default 1")
    private Boolean activeFlag;

    @OneToMany(mappedBy = "station", fetch = FetchType.EAGER)
//            , cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<StationBicycle> stationBicycles = new ArrayList<>();

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
}
