package com.app.bicycle.controller;

import com.app.bicycle.entities.Bicycle;

import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("app/bicycles")
public class BicycleController {
    @Autowired
    BicycleService bicycleService;

    @RequestMapping(method = RequestMethod.GET, value = "/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> findClients(@RequestParam String query,
                                               @RequestHeader("X-Auth-Token") String token) throws Exception {

        Bicycle response = null;
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/newBicycle", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Bicycle> addBicycle(@RequestParam Long stationId) throws Exception {

        Bicycle result = null;
        int beResponse = bicycleService.addBicycle(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            result = bicycleService.findBicycleById(bicycleService.getBicycleNextId());
        } else if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(Constants.STATION_AT_FULL_CAPACITY));
        }

        return new ResponseEntity<>(result, HttpStatus.OK); //it stays null
    }
}
