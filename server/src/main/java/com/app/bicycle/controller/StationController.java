package com.app.bicycle.controller;

import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.service.StationService;
import com.app.bicycle.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("app/stations")
public class StationController {
    @Autowired
    StationService stationService;

    //Available for all users
    @RequestMapping(method = RequestMethod.GET, value = "/getStations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Station>> getStations() throws Exception {

        List<Station> result;

        try {
            result = stationService.getAllActiveStations();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/deactivateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN," + " T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> deactivateStation(@RequestParam Long stationId) throws Exception {

        Station result;
        try {
            result = stationService.deactivateStation(stationId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN," + " T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> addStation(@RequestParam double latitude, @RequestParam double longitude) throws Exception {

        Station result;
        try {
            result = stationService.addStation(latitude, longitude);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addBicycleToStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN," + " T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<StationBicycle> addBikeToStation(@RequestParam Long bikeId, @RequestParam Long stationId) throws Exception {

        StationBicycle result = new StationBicycle();
        int beResponse = stationService.addBikeToStation(bikeId, stationId);
        if (beResponse == Constants.SUCCESSFUL_CONNECTION_MADE) {
            result = stationService.findSBConnection(bikeId, stationId);
        } else if (beResponse == Constants.CONNECTION_ALREADY_EXISTS) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.CONNECTION_ALREADY_EXISTS));
        } else if (beResponse == Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION));
        } else if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.STATION_AT_FULL_CAPACITY));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}