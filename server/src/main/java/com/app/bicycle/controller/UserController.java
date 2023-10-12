package com.app.bicycle.controller;

import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.dto.UserDTO;
import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.CustomError;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("user")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/registerUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO inputUser) {

        UserDTO response;
        try {
            response = userService.registerUser(inputUser);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/deleteUser", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
    public ResponseEntity<UserDTO> deleteUser(@RequestParam Long userId) {
        UserDTO response = new UserDTO();
        try {
            userService.deleteUser(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.PATCH, value = "/editUser", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
    @PostMapping("/edit")
    public ResponseEntity<UserDTO> editUser(@RequestBody UserDTO user) {
        UserDTO response;
        try {
            response = userService.editUser(user);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/getFaultReports", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_SYSTEM_ADMIN, T(com.app.bicycle.enums.UserRole).ROLE_TECH_SUPPORT_MEMBER)")
    public ResponseEntity<List<FaultReportDTO>> getFaultReports() {

        List<FaultReportDTO> response;
        try {
            response = userService.getReports();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/reportFault", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).ROLE_SYSTEM_ADMIN, " +
            "T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER, T(com.app.bicycle.enums.UserRole).ROLE_OBSERVER)")
    public ResponseEntity<FaultReportDTO> faultReport(@RequestParam Long userId, @RequestParam Long bikeId,
                                                      @RequestParam String faultText) {

        FaultReportDTO response;
        try {
            response = userService.reportFault(userId, bikeId, faultText);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
    public ResponseEntity<Bicycle> rentBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.rentBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //unused
    @RequestMapping(method = RequestMethod.POST, value = "/reserve", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
    public ResponseEntity<Bicycle> reserveBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.reserveBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/return", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
        public ResponseEntity<Bicycle> returnBicycle(@RequestParam Long userId, @RequestParam Long stationId) throws CustomError {

        Bicycle result = new Bicycle();
        try {
            userService.returnBicycle(userId, stationId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/userHistory", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER)")
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
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ROLE_TECH_SUPPORT_MEMBER, T(com.app.bicycle.enums.UserRole).ROLE_SYSTEM_ADMIN, " +
            "T(com.app.bicycle.enums.UserRole).ROLE_ORDINARY_USER, T(com.app.bicycle.enums.UserRole).ROLE_OBSERVER)")
    public ResponseEntity<List<RentalDTO>> getAllUserHistory() throws CustomError {

        List<RentalDTO> result;
        try {
            result = userService.getAllHistory();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/details", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> getUserDetails(@RequestParam Long userId) {

        UserDTO result;
        try {
            result = userService.getUserDetails(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
