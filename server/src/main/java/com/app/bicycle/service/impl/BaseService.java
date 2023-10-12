package com.app.bicycle.service.impl;

//import org.modelmapper.ModelMapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class BaseService {
    @Autowired
    protected ModelMapper modelMapper;

    public BaseService() {
    }

    public <T> void checkIfNull(T variable, String objectToFind) {
        if (Objects.isNull(variable)) {
            throw new NullPointerException(String.format("%s not found!", objectToFind));
        }
    }
}