package com.app.bicycle.service;

import com.app.bicycle.entities.Bicycle;

public interface BicycleService {
    int addBicycle(Long stationId);
    Bicycle findBicycleById(Long bikeId);
    Long getBicycleNextId();
}
