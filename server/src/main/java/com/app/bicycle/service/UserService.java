package com.app.bicycle.service;

import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.User;
import com.stripe.exception.*;

import java.util.List;

public interface UserService {

    User registerUser(User input);

    User deleteUser (User input);

    User editUser(User input);

    FaultReport reportFault(Long userId, Long bikeId, String faultText);

    List<FaultReportDTO> getReports();

    boolean checkUserRentedBicycles(Long userId);

    void addUserRentalRecord(Long userId, Long bikeId);

    void increaseUserRentedBicycles(Long userId);

    void increaseUserReservedBicycles(Long userId);

    void rentBicycle(Long userId, Long bikeId);

    void reserveBicycle(Long userId, Long bikeId);

    void returnBicycle(Long userId, Long bikeId, Long stationId);
}
