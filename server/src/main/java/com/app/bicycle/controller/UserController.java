package com.app.bicycle.controller;

import com.app.bicycle.dto.BicycleDTO;
import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.dto.UserDTO;
import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.CustomError;
import org.springframework.http.HttpStatus;
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


    @PostMapping("/registerUser")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO inputUser) {
        UserDTO response;
        try {
            response = userService.registerUser(inputUser);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<UserDTO> deleteUser(@RequestParam Long userId) {
        UserDTO response = new UserDTO();
        try {
            userService.deleteUser(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping("/editUser")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<UserDTO> editUser(@RequestBody UserDTO user) {
        UserDTO response;
        try {
            response = userService.editUser(user);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/getFaultReports")
    @PreAuthorize("hasAnyRole('ROLE_SYSTEM_ADMIN', 'ROLE_TECH_SUPPORT_MEMBER')")
    public ResponseEntity<List<FaultReportDTO>> getFaultReports() {
        List<FaultReportDTO> response;
        try {
            response = userService.getReports();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/reportFault")
    @PreAuthorize("hasAnyRole('ROLE_ORDINARY_USER', 'ROLE_TECH_SUPPORT_MEMBER', 'ROLE_OBSERVER')")
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

    @PostMapping("/rent")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<BicycleDTO> rentBicycle(@RequestParam Long userId, @RequestParam Long bikeId) {
        BicycleDTO response;
        try {
            response = userService.rentBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reserve")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<Bicycle> reserveBicycle(@RequestParam Long userId, @RequestParam Long bikeId) throws CustomError {
        Bicycle response = new Bicycle();
        try {
            userService.reserveBicycle(userId, bikeId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/return")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<RentalDTO> returnBicycle(@RequestParam Long userId, @RequestParam Long stationId) throws CustomError {
        RentalDTO response;
        try {
            response = userService.returnBicycle(userId, stationId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/userHistory")
    @PreAuthorize("hasRole('ROLE_ORDINARY_USER')")
    public ResponseEntity<List<RentalDTO>> userHistory(@RequestParam Long userId) throws CustomError {
        List<RentalDTO> response;
        try {
            response = userService.getUserHistory(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/inquiry")
    @PreAuthorize("hasAnyRole('ROLE_TECH_SUPPORT_MEMBER', 'ROLE_SYSTEM_ADMIN', 'ROLE_OBSERVER')")
    public ResponseEntity<List<RentalDTO>> getAllUserHistory() throws CustomError {
        List<RentalDTO> response;
        try {
            response = userService.getAllHistory();
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<UserDTO> getUserDetails(@RequestParam Long userId) {
        UserDTO response;
        try {
            response = userService.getUserDetails(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
