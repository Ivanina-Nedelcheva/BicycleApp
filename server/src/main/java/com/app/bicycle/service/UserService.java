package com.app.bicycle.service;

import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.dto.UserDTO;
import com.app.bicycle.entities.FaultReport;
import com.app.bicycle.entities.User;
import com.stripe.exception.*;

import java.util.List;

public interface UserService {

    UserDTO registerUser(UserDTO input);

    UserDTO deleteUser (UserDTO input);

    UserDTO editUser(UserDTO input);

    FaultReportDTO reportFault(Long userId, Long bikeId, String faultText);

    List<FaultReportDTO> getReports();

    boolean checkUserRentedBicycles(Long userId);

    void addUserRentalRecord(Long userId, Long bikeId);

    void increaseUserRentedBicycles(Long userId);

    void increaseUserReservedBicycles(Long userId);

    void rentBicycle(Long userId, Long bikeId);

    void reserveBicycle(Long userId, Long bikeId);

    void returnBicycle(Long userId, Long bikeId, Long stationId);

    List<RentalDTO> getUserHistory(Long userId);

    List<RentalDTO> getAllHistory();
}
