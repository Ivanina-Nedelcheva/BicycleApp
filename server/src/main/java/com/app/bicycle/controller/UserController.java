package com.app.bicycle.controller;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.User;
import com.app.bicycle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("app/users")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/registerUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getAllBicycles(@RequestParam User inputUser) throws Exception {

        User response;
        try {
            response = userService.registerUser(inputUser);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
