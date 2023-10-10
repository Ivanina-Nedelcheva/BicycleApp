package com.app.bicycle.service;

import com.app.bicycle.dto.StationBicycleDTO;
import com.app.bicycle.dto.StationDTO;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.utils.CustomResponse;

import java.util.List;

public interface StationService {
    List<Station> getAllActiveStations();

    List<StationDTO> getAllStationsWithBicycles();

    CustomResponse deactivateStation(Long stationId);

    CustomResponse activateStation(Long stationId);

    StationDTO addStation(double longitude, double latitude, String name);

    StationBicycleDTO findSBConnection(Long bikeId, Long stationId);

    void deleteSBConnection(Long bikeId);

    CustomResponse addBikeToStation(Long bikeId, Long stationId);

    StationDTO findStationById(Long stationId);
}
