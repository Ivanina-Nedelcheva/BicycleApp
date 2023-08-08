package com.app.bicycle.service;

import com.app.bicycle.entities.Bicycle;

public interface BicycleService {
    int addBicycle(Long stationId);
    Bicycle findBicycleById(Long bikeId);
    Long getBicycleNextId();
    int deactivateBicycle(Long bikeId);
    int activateBicycle(Long bikeId);
    Bicycle changeDamageFlag(Long bikeId);

}
