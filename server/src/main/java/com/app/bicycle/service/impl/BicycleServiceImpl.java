package com.app.bicycle.service.impl;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.FaultReportRepository;
import com.app.bicycle.repositories.StationBicycleRepository;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BicycleServiceImpl extends BaseService implements BicycleService {
    private final BicycleRepository bicycleRepository;
    private final StationRepository stationRepository;
    private final StationBicycleRepository sbRepository;
    private final FaultReportRepository faultReportRepository;


    public BicycleServiceImpl(BicycleRepository bicycleRepository,
                              StationRepository stationRepository,
                              StationBicycleRepository sbRepository,
                              FaultReportRepository faultReportRepository) {
        this.bicycleRepository = bicycleRepository;
        this.stationRepository = stationRepository;
        this.sbRepository = sbRepository;
        this.faultReportRepository = faultReportRepository;
    }

    @Override
    public CustomResponse addBicycle(Long stationId) {
        Bicycle newBike = new Bicycle();
        newBike.setBatteryLevel(100);
        newBike.setActiveFlag(true);
        newBike.setState(BicycleState.FREE);
        bicycleRepository.save(newBike);

        StationBicycle newConnection = new StationBicycle();
        Station station = stationRepository.getStationById(stationId);
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

    @Override
    public CustomResponse deactivateBicycle(Long bikeId) {
        Bicycle bicycle = bicycleRepository.getBicycleByIdAndActiveFlagTrue(bikeId);
        if (bicycle != null) {
            bicycle.setActiveFlag(false);
            bicycleRepository.save(bicycle);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.BICYCLE_ALREADY_DEACTIVATED;
    }

    @Override
    public CustomResponse activateBicycle(Long bikeId) {
        Bicycle bicycle = bicycleRepository.getBicycleByIdAndActiveFlagFalse(bikeId);
        if (bicycle != null) {
            bicycle.setActiveFlag(true);
            bicycleRepository.save(bicycle);
            deleteFaultReport(bikeId);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.BICYCLE_ALREADY_ACTIVATED;
    }

    @Override
    public List<Bicycle> getAvailableBicycles() {
        return bicycleRepository.getAllFreeActiveBicyclesWithFullCharge();
    }

    @Override
    public boolean changeBicycleState(Long bikeId, BicycleState newState) {
        BicycleState currentState = bicycleRepository.getBicycleState(bikeId);
        if (isValidStateTransition(currentState, newState)) {
            Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
            bicycle.setState(newState);
            bicycleRepository.save(bicycle);
        }
        return false;
    }

    @Override
    public boolean isBicycleInState(Long bikeId, BicycleState desiredState) {
        BicycleState currentState = bicycleRepository.getBicycleState(bikeId);
        return currentState == desiredState;
    }

    @Override
    public void deleteFaultReport(Long bikeId) {
        if (faultReportRepository.reportExists(bikeId) > 0) {
            FaultReport faultReportForDelete = faultReportRepository.getFaultReportByBicycle(bikeId);
            faultReportRepository.delete(faultReportForDelete);
        }
    }

    private Boolean isValidStateTransition(BicycleState currentState, BicycleState newState) {
        switch (currentState) {
            case FREE:
                return newState == BicycleState.RESERVED || newState == BicycleState.RENTED;
            case RENTED:
                return newState == BicycleState.CHARGING;
            case RESERVED:
                return newState == BicycleState.FREE || newState == BicycleState.RENTED;
            case CHARGING:
                return newState == BicycleState.FREE;
            default:
                return false;
        }
    }

}
