package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Station;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.StationService;

import java.util.List;

public class StationServiceImpl implements StationService {
    private final StationRepository stationRepository;

    public StationServiceImpl(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
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
}
