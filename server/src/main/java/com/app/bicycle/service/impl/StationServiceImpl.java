package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.StationBicycleRepository;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.StationService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StationServiceImpl extends BaseService implements StationService {
    private final StationRepository stationRepository;
    private final BicycleRepository bicycleRepository;
    private final StationBicycleRepository sbRepository;

    public StationServiceImpl(StationRepository stationRepository, BicycleRepository bicycleRepository, StationBicycleRepository sbRepository) {
        this.stationRepository = stationRepository;
        this.bicycleRepository = bicycleRepository;
        this.sbRepository = sbRepository;
    }

    @Override
    public List<Station> getAllActiveStations() {
        return stationRepository.findByActiveFlagTrue();
    }

    @Override
    public CustomResponse deactivateStation(Long stationId) {
        Station station = stationRepository.getStationByIdAndActiveFlagTrue(stationId);
        if (station != null) {
            station.setActiveFlag(false);
            stationRepository.save(station);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.STATION_ALREADY_DEACTIVATED;
    }

    @Override
    public CustomResponse activateStation(Long stationId) {
        Station station = stationRepository.getStationByIdAndActiveFlagFalse(stationId);
        if (station != null) {
            station.setActiveFlag(true);
            stationRepository.save(station);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.STATION_ALREADY_ACTIVATED;
    }

    @Override
    public Station addStation(double latitude, double longitude, String name) {
        Station station = new Station();
        station.setLatitude(latitude);
        station.setLongitude(longitude);
        station.setStationName(name);
        station.setActiveFlag(true);

        return stationRepository.save(station);
    }

    @Override
    public StationBicycle findSBConnection(Long bikeId, Long stationId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        Station station = stationRepository.getStationById(stationId);
        return sbRepository.findByBicycleAndStation(bicycle, station);
    }

    @Override
    public void deleteSBConnection(Long bikeId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        StationBicycle connection = sbRepository.findByBicycle(bicycle);
        sbRepository.delete(connection);
    }

    @Override
    public CustomResponse addBikeToStation(Long bikeId, Long stationId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        Station station = stationRepository.getStationById(stationId);

        if (bicycle == null) {
            return Constants.BICYCLE_DOESNT_EXIST;
        } else if (station == null) {
            return Constants.STATION_DOESNT_EXIST;
        }

        if (findSBConnection(bikeId, stationId) != null) {
            return Constants.CONNECTION_ALREADY_EXISTS;
        }

        StationBicycle existingBicycleAssociation = sbRepository.findByBicycle(bicycle);
        if (existingBicycleAssociation != null) {
            return Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION;
        }

        List<StationBicycle> stationBicyclesAtStation = sbRepository.findAllBicyclesByStation(station);
        if (stationBicyclesAtStation.size() >= 10) {
            return Constants.STATION_AT_FULL_CAPACITY;
        }

        StationBicycle stationBicycle = new StationBicycle();
        stationBicycle.setBicycle(bicycle);
        stationBicycle.setStation(station);

        sbRepository.save(stationBicycle);

        return Constants.SUCCESSFUL_OPERATION;
    }

    @Override
    public Station findStationById(Long stationId) {
        return stationRepository.getStationById(stationId);
    }
}
