package com.app.bicycle.controller;

import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.User;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.CustomError;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    private final SimpMessagingTemplate messagingTemplate;

    public UserController(UserService userService, SimpMessagingTemplate messagingTemplate) {
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/registerUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getAllBicycles(@RequestParam User inputUser) throws Exception {

        User response;
        try {
//            response = userService.registerUser(inputUser);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/getFaultReports", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FaultReportDTO>> getFaultReports() throws Exception {

        List<FaultReportDTO> response;
        try {
            response = userService.getReports();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/reportFault", produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, " +
//            "T(com.app.bicycle.enums.UserRole).ORDINARY_USER, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<FaultReport> faultReport(@RequestParam Long userId, @RequestParam Long bikeId,
                                                   @RequestParam String faultText) throws Exception {

        FaultReport response;
        try {
            response = userService.reportFault(userId, bikeId, faultText);
            String notificationMessage = "A new fault report has been created.";
            messagingTemplate.convertAndSend("/topic/faultReports", notificationMessage);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> rentBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.rentBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/reserve", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> reserveBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.reserveBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/return", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> returnBicycle(@RequestParam Long userId, @RequestParam Long bikeId, @RequestParam Long stationId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.returnBicycle(userId, bikeId, stationId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userHistory", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<List<RentalDTO>> userHistory(@RequestParam Long userId) throws CustomError {

        List<RentalDTO> result;
        try {
            result = userService.getUserHistory(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/inquiry", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).SYSTEM_ADMIN, " +
            "T(com.app.bicycle.enums.UserRole).ORDINARY_USER, T(com.app.bicycle.enums.UserRole).OBSERVER)")
    public ResponseEntity<List<RentalDTO>> getAllUserHistory() throws CustomError {

        List<RentalDTO> result;
        try {
            result = userService.getAllHistory();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
