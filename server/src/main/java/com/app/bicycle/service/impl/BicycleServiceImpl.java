package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.StationBicycleRepository;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.utils.Constants;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BicycleServiceImpl implements BicycleService {
    private final BicycleRepository bicycleRepository;

    private final StationRepository stationRepository;

    private final StationBicycleRepository sbRepository;

    public BicycleServiceImpl(BicycleRepository bicycleRepository, StationRepository stationRepository, StationBicycleRepository sbRepository) {
        this.bicycleRepository = bicycleRepository;
        this.stationRepository = stationRepository;
        this.sbRepository = sbRepository;
    }

    @Override
    public int addBicycle(Long stationId) {
        Bicycle newBike = new Bicycle();
        newBike.setBatteryLevel(100); //maybe add battery level manually
        newBike.setDamageFlag(false);
        newBike.setActiveFlag(true);
        newBike.setState(BicycleState.FREE);
        bicycleRepository.save(newBike);

        StationBicycle newConnection = new StationBicycle();
        Station station = stationRepository.getStationsById(stationId);
        newConnection.setBicycle(newBike);
        newConnection.setStation(station);

        List<StationBicycle> stationBicyclesAtStation = sbRepository.findAllBicyclesByStation(station);
        if (stationBicyclesAtStation.size() >= 10) {
            return Constants.STATION_AT_FULL_CAPACITY;
        }
        sbRepository.save(newConnection);

        return Constants.SUCCESSFUL_OPERATION;
    }

    @Override
    public Bicycle findBicycleById(Long bikeId) {
        return bicycleRepository.getBicycleById(bikeId);
    }

    @Override
    public Long getBicycleNextId() {
        return bicycleRepository.getMaxBicycleId() + 1;
    }
}
