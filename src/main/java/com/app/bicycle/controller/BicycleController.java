package com.app.bicycle.controller;

import com.app.bicycle.entities.Bicycle;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bicycles")
public class BicycleController {
    @RequestMapping(method = RequestMethod.GET, value = "/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyRole(T(com.app.bicycle.enums.UserRole).ORDINARY_USER)")
    public ResponseEntity<Bicycle> findClients(@RequestParam String query,
                                               @RequestHeader("X-Auth-Token") String token) throws Exception {

        Bicycle response = null;
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
