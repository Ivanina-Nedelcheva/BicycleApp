package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Station;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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

    @Override
    public Station addStation(double latitude, double longitude) {
        Station station = new Station();
        station.setLatitude(latitude);
        station.setLongitude(longitude);

        return stationRepository.save(station);
    }
}
