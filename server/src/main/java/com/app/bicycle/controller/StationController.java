package com.app.bicycle.controller;

import com.app.bicycle.entities.Station;
import com.app.bicycle.service.StationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("app/stations")
public class StationController {
    StationService stationService;

    //Available for all users
    @RequestMapping(method = RequestMethod.GET, value = "/getStations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Station>> getStations(@RequestHeader("X-Auth-Token") String token) throws Exception {

        List<Station> result = null;

        try {
            result = stationService.getAllActiveStations();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
