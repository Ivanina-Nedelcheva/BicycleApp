package com.app.bicycle.controller;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomError;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("app/bicycles")
public class BicycleController {

    private BicycleService bicycleService;
    private UserService userService;

    public BicycleController(BicycleService bicycleService, UserService userService) {
        this.bicycleService = bicycleService;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/getAllBicycles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Bicycle>> getAllBicycles() {

        List<Bicycle> result;
        try {
            result = bicycleService.getAvailableBicycles();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> rentBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {

        Bicycle response = new Bicycle();
        if (userService.checkUserRentedBicycles(userId)) {
            throw new CustomError(Constants.CANNOT_RENT_MORE_THAN_ONE_BICYCLE);
        } else if (bicycleService.getAvailableBicycles().isEmpty()) {
            throw new CustomError(Constants.NO_BICYCLES_AVAILABLE);
        } else if (!bicycleService.isBicycleInState(bikeId, BicycleState.FREE)) {
            throw new CustomError(Constants.BICYCLE_IS_NOT_FREE);
        } else {
            userService.increaseUserRentedBicycles(userId);
            userService.addUserRentalRecord(userId, bikeId);
            //remove bicycle from station
            bicycleService.changeBicycleState(bikeId, BicycleState.RENTED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/newBicycle", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Bicycle> addBicycle(@RequestParam Long stationId) throws CustomError {

        Bicycle result = new Bicycle();
        CustomResponse beResponse = bicycleService.addBicycle(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = bicycleService.findBicycleById(bicycleService.getBicycleNextId());
        } else if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            throw new CustomError(Constants.STATION_AT_FULL_CAPACITY);
        }

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/deactivateBicycle", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Bicycle> deactivateBicycle(@RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        CustomResponse beResponse = bicycleService.deactivateBicycle(bikeId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = bicycleService.findBicycleById(bikeId);
        } else if (beResponse == Constants.BICYCLE_ALREADY_DEACTIVATED) {
           throw new CustomError(Constants.BICYCLE_ALREADY_DEACTIVATED);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateBicycle", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Bicycle> activateBicycle(@RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        CustomResponse beResponse = bicycleService.activateBicycle(bikeId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = bicycleService.findBicycleById(bikeId);
        } else if (beResponse == Constants.BICYCLE_ALREADY_ACTIVATED) {
           throw new CustomError(Constants.BICYCLE_ALREADY_ACTIVATED);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/switchDamageFlag", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Bicycle> addStation(@RequestParam Long bikeId) {

        Bicycle result;
        try {
            result = bicycleService.changeDamageFlag(bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
