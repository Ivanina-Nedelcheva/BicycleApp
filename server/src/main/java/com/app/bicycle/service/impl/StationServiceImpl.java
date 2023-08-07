package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.StationBicycleRepository;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.StationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationServiceImpl implements StationService {
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
    public Station deactivateStation(Long stationId) {
        Station station = stationRepository.findById(stationId).orElse(null);
        if (station != null) {
            station.setActiveFlag(false);
            stationRepository.save(station);
        }
        return station;
    }

    @Override
    public Station addStation(double latitude, double longitude) {
        Station station = new Station();
        station.setLatitude(latitude);
        station.setLongitude(longitude);
        station.setActiveFlag(true);

        return stationRepository.save(station);
    }

    @Override
    public StationBicycle addBikeToStation(Long bikeId, Long stationId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        Station station = stationRepository.getStationsById(stationId);

        StationBicycle stationBicycle = new StationBicycle();
        stationBicycle.setBicycle(bicycle);
        stationBicycle.setStation(station);

        return sbRepository.save(stationBicycle);
    }
}
