package com.app.bicycle.service;

import com.app.bicycle.dto.BicycleDTO;
import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.utils.CustomResponse;

import java.util.List;

public interface BicycleService {
    CustomResponse addBicycle(Long stationId);

    BicycleDTO findBicycleById(Long bikeId);

    Long getBicycleNextId();

    CustomResponse deactivateBicycle(Long bikeId);

    CustomResponse activateBicycle(Long bikeId);

    List<Bicycle> getAvailableBicycles();

    boolean changeBicycleState(Long bikeId, BicycleState newState);

    boolean isBicycleInState(Long bikeId, BicycleState desiredState);

    void deleteFaultReport(Long bikeId);
}
