package com.app.bicycle.controller;

import com.app.bicycle.dto.BicycleDTO;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomError;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("bicycles")
public class BicycleController {

    private final BicycleService bicycleService;

    public BicycleController(BicycleService bicycleService) {
        this.bicycleService = bicycleService;
    }

    @PostMapping("/newBicycle")
    @PreAuthorize("hasRole('ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<CustomResponse> addBicycle(@RequestParam Long stationId) throws CustomError {

        CustomResponse beResponse = bicycleService.addBicycle(stationId);
        if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            throw new CustomError(Constants.STATION_AT_FULL_CAPACITY);
        }
        return new ResponseEntity<>(beResponse, HttpStatus.CREATED);
    }

    @PostMapping("/deactivateBicycle")
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<BicycleDTO> deactivateBicycle(@RequestParam Long bikeId) throws CustomError {

        BicycleDTO response = new BicycleDTO();
        CustomResponse beResponse = bicycleService.deactivateBicycle(bikeId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            response = bicycleService.findBicycleById(bikeId);
        } else if (beResponse == Constants.BICYCLE_ALREADY_DEACTIVATED) {
            throw new CustomError(Constants.BICYCLE_ALREADY_DEACTIVATED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/activateBicycle")
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<BicycleDTO> activateBicycle(@RequestBody Long bikeId) throws CustomError {

        BicycleDTO response = new BicycleDTO();
        CustomResponse beResponse = bicycleService.activateBicycle(bikeId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            response = bicycleService.findBicycleById(bikeId);
        } else if (beResponse == Constants.BICYCLE_ALREADY_ACTIVATED) {
            throw new CustomError(Constants.BICYCLE_ALREADY_ACTIVATED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/changeState")
    public ResponseEntity<BicycleDTO> changeState(@RequestParam Long bikeId, @RequestParam String newState) throws CustomError {

        BicycleDTO response;
        try {
            bicycleService.changeBicycleState(bikeId, BicycleState.valueOf(newState));
            response = bicycleService.findBicycleById(bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
