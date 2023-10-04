package com.app.bicycle.controller;

import com.app.bicycle.dto.StationDTO;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.service.StationService;
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
@RequestMapping("stations")
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/getAllStations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Station>> getStations() throws Exception {

        List<Station> result;

        try {
            result = stationService.getAllActiveStations();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/getStationWithBicycles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StationDTO>> getStationWithBicycles() {

        List<StationDTO> result;

        try {
            result = stationService.getAllStationsWithBicycles();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/newStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN)")
    public ResponseEntity<Station> addStation(@RequestParam double latitude, @RequestParam double longitude, @RequestParam String name) throws Exception {

        Station result;
        try {
            result = stationService.addStation(latitude, longitude, name);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/deactivateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN)")
    public ResponseEntity<Station> deactivateStation(@RequestParam Long stationId) throws CustomError {

        Station result = new Station();
        CustomResponse beResponse = stationService.deactivateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_DEACTIVATED) {
            throw new CustomError(Constants.STATION_ALREADY_DEACTIVATED);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN)")
    public ResponseEntity<Station> activateStation(@RequestParam Long stationId) throws CustomError {

        Station result = new Station();
        CustomResponse beResponse = stationService.activateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_ACTIVATED) {
            throw new CustomError(Constants.STATION_ALREADY_ACTIVATED);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/addBicycleToStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN)")
    public ResponseEntity<StationBicycle> addBikeToStation(@RequestParam Long bikeId, @RequestParam Long stationId) throws CustomError {

        StationBicycle result = new StationBicycle();
        CustomResponse beResponse = stationService.addBikeToStation(bikeId, stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = stationService.findSBConnection(bikeId, stationId);
        } else if (beResponse == Constants.CONNECTION_ALREADY_EXISTS) {
            throw new CustomError(Constants.CONNECTION_ALREADY_EXISTS);
        } else if (beResponse == Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION) {
            throw new CustomError(Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION);
        } else if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            throw new CustomError(Constants.STATION_AT_FULL_CAPACITY);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
