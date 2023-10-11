package com.app.bicycle.dto;

import java.util.List;

public class StationDTO {
    private Long id;
    private String stationName;
    private Double latitude;
    private Double longitude;
    private List<BicycleDTO> bicycles;
    private Boolean activeFlag;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public List<BicycleDTO> getBicycles() {
        return bicycles;
    }

    public void setBicycles(List<BicycleDTO> bicycles) {
        this.bicycles = bicycles;
    }

    public Boolean getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
    }
}
