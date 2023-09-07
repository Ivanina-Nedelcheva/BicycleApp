package com.app.bicycle.service;

import com.app.bicycle.entities.User;

public interface UserService {

    User registerUser(User input);

    User deleteUser (User input);

    User editUser(User input);
}
