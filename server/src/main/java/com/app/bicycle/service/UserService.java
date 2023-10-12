package com.app.bicycle.service;

import com.app.bicycle.dto.FaultReportDTO;
import com.app.bicycle.dto.RentalDTO;
import com.app.bicycle.dto.UserDTO;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface UserService {

    UserDTO registerUser(UserDTO input);

    void deleteUser(Long userId);

    UserDTO editUser(UserDTO input);

    UserDTO getUserDetails(Long userId) throws ChangeSetPersister.NotFoundException;

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
