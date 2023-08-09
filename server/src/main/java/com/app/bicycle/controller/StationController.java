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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> deactivateStation(@RequestParam Long stationId) throws Exception {

        Station result = new Station();
        int beResponse = stationService.deactivateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_DEACTIVATED) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.STATION_ALREADY_DEACTIVATED));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> activateStation(@RequestParam Long stationId) throws Exception {

        Station result = new Station();
        int beResponse = stationService.activateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_ACTIVATED) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.STATION_ALREADY_ACTIVATED));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/newStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> addStation(@RequestParam double latitude, @RequestParam double longitude,
                                              @RequestParam String name) throws Exception {

        Station result;
        try {
            result = stationService.addStation(latitude, longitude, name);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addBicycleToStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN,  T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<StationBicycle> addBikeToStation(@RequestParam Long bikeId, @RequestParam Long stationId) throws Exception {

        StationBicycle result = new StationBicycle();
        int beResponse = stationService.addBikeToStation(bikeId, stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
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
