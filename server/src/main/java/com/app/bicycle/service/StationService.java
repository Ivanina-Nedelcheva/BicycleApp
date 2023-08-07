package com.app.bicycle.service;

import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;

import java.util.List;

public interface StationService {
    List<Station> getAllActiveStations();
    Station deactivateStation(Long stationId);
    Station addStation(double longitude, double latitude);
    StationBicycle addBikeToStation(Long bikeId, Long stationId);
}
