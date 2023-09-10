package com.app.bicycle.service.impl;

import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.Rental;
import com.app.bicycle.entities.User;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.FaultReportRepository;
import com.app.bicycle.repositories.RentalRepository;
import com.app.bicycle.repositories.UserRepository;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.service.StationService;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FaultReportRepository faultReportRepository;
    private final BicycleRepository bicycleRepository;
    private final RentalRepository rentalRepository;
    private final BicycleService bicycleService;
    private final StationService stationService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           FaultReportRepository faultReportRepository,
                           BicycleRepository bicycleRepository,
                           RentalRepository rentalRepository,
                           BicycleService bicycleService,
                           StationService stationService) {
        this.userRepository = userRepository;
        this.faultReportRepository = faultReportRepository;
        this.bicycleRepository = bicycleRepository;
        this.rentalRepository = rentalRepository;
        this.bicycleService = bicycleService;
        this.stationService = stationService;
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

    @Override
    public FaultReport reportFault(Long userId, Long bikeId, String faultText) {
        FaultReport report = new FaultReport();
        report.setUser(userRepository.getReferenceById(userId));
        report.setBicycle(bicycleRepository.getBicycleById(bikeId));
        report.setFaultText(faultText);
        report.setDate(new Date(System.currentTimeMillis()));

        bicycleService.deactivateBicycle(bikeId);
        return faultReportRepository.save(report);
    }

    @Override
    public boolean checkUserRentedBicycles(Long userId) {
        User user = userRepository.getReferenceById(userId);
        Long result = rentalRepository.checkUserRentals(user);
        return result >= 1;
    }

    @Override
    public void addUserRentalRecord(Long userId, Long bikeId) {
        Rental newRental = new Rental();
        newRental.setUser(userRepository.getReferenceById(userId));
        newRental.setBicycle(bicycleRepository.getBicycleById(bikeId));
        newRental.setDate(new Date(System.currentTimeMillis()));
        newRental.setStartTime(new Timestamp(System.currentTimeMillis()));
        newRental.setFinished(false);
        rentalRepository.save(newRental);
    }

    @Override
    public void increaseUserRentedBicycles(Long userId) {
        User user = userRepository.getUserById(userId);
        user.setUserRentedBicycles(1);
    }

    @Override
    public void rentBicycle(Long userId, Long bikeId) {
        if (checkUserRentedBicycles(userId)) {
            throw new CustomError(Constants.CANNOT_RENT_MORE_THAN_ONE_BICYCLE);
        } else if (bicycleService.getAvailableBicycles().isEmpty()) {
            throw new CustomError(Constants.NO_BICYCLES_AVAILABLE);
        } else if (!bicycleService.isBicycleInState(bikeId, BicycleState.FREE)) {
            throw new CustomError(Constants.BICYCLE_IS_NOT_FREE);
        } else {
            increaseUserRentedBicycles(userId);
            addUserRentalRecord(userId, bikeId);
            stationService.deleteSBConnection(bikeId);
            bicycleService.changeBicycleState(bikeId, BicycleState.RENTED);
        }
    }
}
