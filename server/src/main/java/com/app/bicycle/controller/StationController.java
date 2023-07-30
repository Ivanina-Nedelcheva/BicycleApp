package com.app.bicycle.controller;

import com.app.bicycle.entities.Station;
import com.app.bicycle.service.StationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("app/stations")
public class StationController {
    StationService stationService;

    //Available for all users
    @RequestMapping(method = RequestMethod.GET, value = "/getStations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Station>> getStations(@RequestHeader("X-Auth-Token") String token) throws Exception {

        List<Station> result;

        try {
            result = stationService.getAllActiveStations();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/deactivateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN," +
            " T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> deactivateStation(@RequestParam Long stationId, @RequestHeader("X-Auth-Token") String token) throws Exception {

        Station result;
        try {
            result = stationService.deactivateStation(stationId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN," +
            " T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<Station> addStation(@RequestParam double latitude, @RequestParam double longitude,
                                              @RequestHeader("X-Auth-Token") String token) throws Exception {

        Station result;
        try {
            result = stationService.addStation(latitude, longitude);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
