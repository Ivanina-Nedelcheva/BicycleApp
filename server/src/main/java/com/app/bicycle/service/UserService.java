package com.app.bicycle.service;

import com.app.bicycle.dto.BicycleDTO;
import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO registerUser(UserDTO input);

    void deleteUser(Long userId);

    UserDTO editUser(UserDTO input);

    UserDTO getUserDetails(Long userId);

    FaultReportDTO reportFault(Long userId, Long bikeId, String faultText);

    List<FaultReportDTO> getReports();

    boolean checkUserRentedBicycles(Long userId);

    void increaseUserRentedBicycles(Long userId);

    void increaseUserReservedBicycles(Long userId);

    BicycleDTO rentBicycle(Long userId, Long bikeId);

    void reserveBicycle(Long userId, Long bikeId);

    void returnBicycle(Long userId, Long stationId);

    List<RentalDTO> getUserHistory(Long userId);

    List<RentalDTO> getAllHistory();
}
