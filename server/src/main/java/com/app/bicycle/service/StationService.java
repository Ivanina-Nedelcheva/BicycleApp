package com.app.bicycle.service;

import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;

import java.util.List;

public interface StationService {
    List<Station> getAllActiveStations();
    Station deactivateStation(Long stationId);
    Station addStation(double longitude, double latitude, String name);
    StationBicycle findSBConnection(Long bikeId, Long stationId);
    int addBikeToStation(Long bikeId, Long stationId);
}
