package com.app.bicycle.controller;

import com.app.bicycle.dto.StationBicycleDTO;
import com.app.bicycle.dto.StationDTO;
import com.app.bicycle.entities.Station;
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

    @RequestMapping(method = RequestMethod.GET, value = "/getStationWithBicycles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StationDTO>> getStationWithBicycles() {

        List<StationDTO> response;

        try {
            response = stationService.getAllStationsWithBicycles();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/newStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole('ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<StationDTO> addStation(@RequestBody Station station) {

        StationDTO response;
        try {
            response = stationService.addStation(station.getLatitude(), station.getLongitude(), station.getStationName());
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/deactivateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<StationDTO> deactivateStation(@RequestParam Long stationId) throws CustomError {

        StationDTO response = new StationDTO();
        CustomResponse beResponse = stationService.deactivateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            response = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_DEACTIVATED) {
            throw new CustomError(Constants.STATION_ALREADY_DEACTIVATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<StationDTO> activateStation(@RequestParam Long stationId) throws CustomError {

        StationDTO response = new StationDTO();
        CustomResponse beResponse = stationService.activateStation(stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            response = stationService.findStationById(stationId);
        } else if (beResponse == Constants.STATION_ALREADY_ACTIVATED) {
            throw new CustomError(Constants.STATION_ALREADY_ACTIVATED);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/addBicycleToStation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN')")
    public ResponseEntity<StationBicycleDTO> addBikeToStation(@RequestParam Long bikeId, @RequestParam Long stationId) throws CustomError {

        StationBicycleDTO response = new StationBicycleDTO();
        CustomResponse beResponse = stationService.addBikeToStation(bikeId, stationId);
        if (beResponse == Constants.SUCCESSFUL_OPERATION) {
            response = stationService.findSBConnection(bikeId, stationId);
        } else if (beResponse == Constants.CONNECTION_ALREADY_EXISTS) {
            throw new CustomError(Constants.CONNECTION_ALREADY_EXISTS);
        } else if (beResponse == Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION) {
            throw new CustomError(Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION);
        } else if (beResponse == Constants.STATION_AT_FULL_CAPACITY) {
            throw new CustomError(Constants.STATION_AT_FULL_CAPACITY);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
