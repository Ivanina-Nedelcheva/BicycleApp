package com.app.bicycle.service;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BicycleService {
    CustomResponse addBicycle(Long stationId);

    Bicycle findBicycleById(Long bikeId);

    Long getBicycleNextId();

    CustomResponse deactivateBicycle(Long bikeId);

    CustomResponse activateBicycle(Long bikeId);

    List<Bicycle> getAvailableBicycles();

    boolean changeBicycleState(Long bikeId, BicycleState newState);

    boolean isBicycleInState(Long bikeId, BicycleState desiredState);
}
