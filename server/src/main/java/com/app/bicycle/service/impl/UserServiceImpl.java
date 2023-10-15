package com.app.bicycle.service.impl;

import com.app.bicycle.dto.*;
import com.app.bicycle.entities.*;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.enums.UserRole;
import com.app.bicycle.repositories.*;
import com.app.bicycle.service.BicycleService;
import com.app.bicycle.service.StationService;
import com.app.bicycle.service.UserService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomError;
import com.app.bicycle.utils.ScheduledTimer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl extends BaseService implements UserService {

    private final UserRepository userRepository;
    private final FaultReportRepository faultReportRepository;
    private final BicycleRepository bicycleRepository;
    private final RentalRepository rentalRepository;
    private final StationBicycleRepository sbRepository;
    private final BicycleService bicycleService;
    private final StationService stationService;
    private final PriceRepository priceRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           FaultReportRepository faultReportRepository,
                           BicycleRepository bicycleRepository,
                           RentalRepository rentalRepository,
                           StationBicycleRepository sbRepository,
                           BicycleService bicycleService,
                           StationService stationService,
                           PriceRepository priceRepository,
                           PasswordEncoder passwordEncoder,
                           ModelMapper modelMapper,
                           RoleRepository roleRepository,
                           ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.faultReportRepository = faultReportRepository;
        this.bicycleRepository = bicycleRepository;
        this.rentalRepository = rentalRepository;
        this.sbRepository = sbRepository;
        this.bicycleService = bicycleService;
        this.stationService = stationService;
        this.priceRepository = priceRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public UserDTO registerUser(UserDTO input) {
        User registerUser = modelMapper.map(input, User.class);
        setUser(input, registerUser);
        Role ordinary = roleRepository.findByRoleName(UserRole.ROLE_ORDINARY_USER);
        registerUser.setRole(ordinary);
        userRepository.save(registerUser);
        return userToDTO(registerUser);
    }

    @Override
    public void deleteUser(Long userId) {
        User foundUser = userRepository.findUserById((userId));
        userRepository.delete(foundUser);
    }

    @Override
    public UserDTO editUser(UserDTO input) {
        User foundUser = userRepository.findById(input.getId()).orElseThrow(() -> new UsernameNotFoundException("No user found!"));
        setUser(input, foundUser);

        return modelMapper.map(foundUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserDetails(Long userId) {
        User user = userRepository.findUserById(userId);
        return userToDTO(user);
    }

    @Override
    public FaultReportDTO reportFault(Long userId, Long bikeId, String faultText) {
        FaultReport report = new FaultReport();
        report.setUser(userRepository.getReferenceById(userId));
        report.setBicycle(bicycleRepository.getBicycleById(bikeId));
        report.setFaultText(faultText);
        report.setDate(new Date(System.currentTimeMillis()));

        bicycleService.deactivateBicycle(bikeId);
        report = faultReportRepository.save(report);
        return reportToDTO(report);
    }

    @Override
    public List<FaultReportDTO> getReports() {
        List<FaultReport> faultReports = faultReportRepository.findAllByOrderByDateDesc();
        return faultReports.stream()
                .map(this::reportToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public boolean checkUserRentedBicycles(Long userId) {
        User user = userRepository.getReferenceById(userId);
        Long result = rentalRepository.checkUserRentals(user);
        return result >= 1;
    }

    @Override
    public void increaseUserRentedBicycles(Long userId) {
        User user = userRepository.findUserById(userId);
        user.setUserRentedBicycles(1);
    }

    @Override
    public void increaseUserReservedBicycles(Long userId) {
        User user = userRepository.findUserById(userId);
        user.setUserReservedBicycles(1);
    }


    @Override
    public BicycleDTO rentBicycle(Long userId, Long bikeId) {
        if (checkUserRentedBicycles(userId)) {
            throw new CustomError(Constants.CANNOT_RENT_MORE_THAN_ONE_BICYCLE);
        } else if (bicycleService.getAvailableBicycles().isEmpty()) {
            throw new CustomError(Constants.NO_BICYCLES_AVAILABLE);
        } else if (!bicycleService.isBicycleInState(bikeId, BicycleState.FREE) &&
                !bicycleService.isBicycleInState(bikeId, BicycleState.RESERVED)) {
            throw new CustomError(Constants.BICYCLE_IS_NOT_FREE_OR_RESERVED);
        } else {
            increaseUserRentedBicycles(userId);
            addUserRentalRecord(userId, bikeId);
            stationService.deleteSBConnection(bikeId);
            bicycleService.changeBicycleState(bikeId, BicycleState.RENTED);
        }
        return bicycleService.findBicycleById(bikeId);
    }

    private void addUserRentalRecord(Long userId, Long bikeId) {
        Rental newRental = new Rental();
        newRental.setUser(userRepository.findUserById(userId));
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        newRental.setBicycle(bicycle);
        newRental.setStartTime(new Timestamp(System.currentTimeMillis()));
        newRental.setDate(new Date(System.currentTimeMillis()));
        StationBicycle connection = sbRepository.findStationBicycleByBicycle(bicycle);
        newRental.setStation(connection.getStation());
        newRental.setFinished(false);
        rentalRepository.save(newRental);
    }


    @Override
    public void reserveBicycle(Long userId, Long bikeId) {
        if (!bicycleService.isBicycleInState(bikeId, BicycleState.FREE)) {
            throw new CustomError(Constants.BICYCLE_IS_NOT_FREE_OR_RESERVED);
        }
        stationService.deleteSBConnection(bikeId);
        bicycleService.changeBicycleState(bikeId, BicycleState.RESERVED);
        increaseUserReservedBicycles(userId);
        saveUserReservation(userId, bikeId);
    }

    private void saveUserReservation(Long userId, Long bikeId) {
        User user = userRepository.findUserById(userId);
        Bicycle bicycle = bicycleRepository.findBicycleById(bikeId);
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setBicycle(bicycle);
        reservationRepository.save(reservation);
    }

    @Override
    public void returnBicycle(Long userId, Long stationId) {
        Price prices = priceRepository.findTopByOrderByIdDesc();
        User user = userRepository.findUserById(userId);
        Rental userRent = rentalRepository.findRentalByUserAndFinishedFalse(user);
        Bicycle bicycle = userRent.getBicycle();

        userRent.setFinished(true);
        userRent.setDistance(bicycle.getDistance());
        Timestamp startTime = userRent.getStartTime();
        Timestamp endTime = new Timestamp(System.currentTimeMillis());
        userRent.setEndTime(endTime);
        long duration = (endTime.getTime() - startTime.getTime()) / (60 * 1000);

        BigDecimal price = BigDecimal.valueOf(duration * prices.getMinutePrice() + prices.getUnlockPrice());
        userRent.setPrice(price);
        userRent.setDistance(duration / 2.5);
        rentalRepository.save(userRent);

        stationService.addBikeToStation(bicycle.getId(), stationId);
        bicycleService.changeBicycleState(bicycle.getId(), BicycleState.CHARGING);
    }

    @Override
    public List<RentalDTO> getUserHistory(Long userId) {
        List<Rental> history = rentalRepository.findRentalByUserAndFinishedTrue(userRepository.findUserById(userId));
        List<RentalDTO> historyDTOList = new ArrayList<>();

        if (history != null) {
            for (Rental rental : history) {
                RentalDTO rentalDTO = new RentalDTO();

                rentalDTO.setDate(rental.getDate());
                rentalDTO.setDistance(rental.getDistance());
                rentalDTO.setPrice(rental.getPrice());
                Double minutes = (double) ((rental.getEndTime().getTime() - rental.getStartTime().getTime()) / (60 * 1000));
                rentalDTO.setMinutes(minutes);

                historyDTOList.add(rentalDTO);
            }
        }
        return historyDTOList;
    }

    @Override
    public List<RentalDTO> getAllHistory() {
        List<Rental> history = rentalRepository.findRentalByFinishedTrue();
        List<RentalDTO> historyDTOList = new ArrayList<>();

        if (history != null) {
            for (Rental rental : history) {
                RentalDTO rentalDTO = new RentalDTO();

                rentalDTO.setDate(rental.getDate());
                rentalDTO.setDistance(rental.getDistance());
                rentalDTO.setPrice(rental.getPrice());
                rentalDTO.setFinished(rental.isFinished());
                rentalDTO.setUser(rental.getUser());
                rentalDTO.setStation(stationService.stationToDTO(rental.getStation()));
                rentalDTO.setBicycle(rental.getBicycle());
                Double minutes = (double) ((rental.getEndTime().getTime() - rental.getStartTime().getTime()) / (60 * 1000));
                rentalDTO.setMinutes(minutes);

                historyDTOList.add(rentalDTO);
            }
        }
        return historyDTOList;
    }

    private FaultReportDTO reportToDTO(FaultReport faultReport) {
        FaultReportDTO dto = new FaultReportDTO();
        dto.setBikeId(faultReport.getBicycle().getId());
        dto.setUser(userToDTO(faultReport.getUser()));
        dto.setFaultText(faultReport.getFaultText());
        dto.setDate(faultReport.getDate());

        return dto;
    }

    private void setUser(UserDTO input, User foundUser) {
        foundUser.setFirstName(input.getFirstName());
        foundUser.setLastName(input.getLastName());
        Integer age = Period.between(input.getDateOfBirth(), LocalDate.now()).getYears();
        foundUser.setAge(age);
        foundUser.setEmail(input.getEmail());
        foundUser.setPhoneNumber(input.getPhoneNumber());
        foundUser.setPassword(passwordEncoder.encode(input.getPassword()));
    }

    private UserDTO userToDTO(User user) {
        Rental rental = rentalRepository.findRentalByUserAndFinishedFalse(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setEmail(user.getEmail());
        userDTO.setAge(user.getAge());
        userDTO.setPassword(user.getPassword());
        userDTO.setStripeId(user.getStripeId());
        userDTO.setReservations(user.getReservations().stream()
                .map(this::convertReservationToDTO)
                .collect(Collectors.toList()));
        if (rental != null) {
            RentalDTO rentalDTO = new RentalDTO();
            rentalDTO.setFinished(rental.isFinished());
            userDTO.setRentals(Collections.singletonList(rentalDTO));
        }
        return userDTO;
    }

    private ReservationDTO convertReservationToDTO(Reservation reservation) {
        return modelMapper.map(reservation, ReservationDTO.class);
    }

}