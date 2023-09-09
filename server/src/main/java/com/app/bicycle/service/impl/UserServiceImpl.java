package com.app.bicycle.service.impl;

import com.app.bicycle.entities.User;
import com.app.bicycle.enums.UserRole;
import com.app.bicycle.repositories.UserRepository;
import com.app.bicycle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends BaseService implements UserService {

    private final UserRepository userRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User input) {
//        User registerUser = modelMapper.map(input, User.class);
//        registerUser.setFirstName(input.getFirstName());
//        registerUser.setLastName(input.getLastName());
//        registerUser.setAge(input.getAge());
//        registerUser.setEmail(input.getEmail());
//        registerUser.setPhoneNumber(input.getPhoneNumber());
//        registerUser.setUsername(input.getFirstName().substring(0,2) + input.getLastName().substring(0,2));
//        registerUser.setPassword(passwordEncoder.encode(registerUser.getPassword()));
//        registerUser.setRole(UserRole.ORDINARY_USER);
//
//        userRepository.save(registerUser);
//        User responseUser = modelMapper.map(registerUser, User.class);
        return input;
    }

    @Override
    public User deleteUser(User input) {
        return null;
    }

    @Override
    public User editUser(User input) {
        return null;
    }
}
