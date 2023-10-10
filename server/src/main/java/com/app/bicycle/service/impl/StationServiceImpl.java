package com.app.bicycle.service.impl;

import com.app.bicycle.dto.BicycleDTO;
import com.app.bicycle.dto.StationBicycleDTO;
import com.app.bicycle.dto.StationDTO;
import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import com.app.bicycle.enums.BicycleState;
import com.app.bicycle.repositories.BicycleRepository;
import com.app.bicycle.repositories.StationBicycleRepository;
import com.app.bicycle.repositories.StationRepository;
import com.app.bicycle.service.StationService;
import com.app.bicycle.utils.Constants;
import com.app.bicycle.utils.CustomResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StationServiceImpl extends BaseService implements StationService {
    private final StationRepository stationRepository;
    private final BicycleRepository bicycleRepository;
    private final StationBicycleRepository sbRepository;

    public StationServiceImpl(StationRepository stationRepository, BicycleRepository bicycleRepository, StationBicycleRepository sbRepository) {
        this.stationRepository = stationRepository;
        this.bicycleRepository = bicycleRepository;
        this.sbRepository = sbRepository;
    }

    @Override
    public List<Station> getAllActiveStations() {
        return stationRepository.findByActiveFlagTrue();
    }

    @Override
    public List<StationDTO> getAllStationsWithBicycles() {
        List<Station> stations = stationRepository.findAll();

        return stations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private StationDTO convertToDTO(Station station) {
        StationDTO dto = new StationDTO();
        dto.setId(station.getId());
        dto.setStationName(station.getStationName());
        dto.setLatitude(station.getLatitude());
        dto.setLongitude(station.getLongitude());

        if (!station.getStationBicycles().isEmpty()) {
            List<BicycleDTO> bicycleDTOs = station.getStationBicycles().stream()
                    .filter(stationBicycle -> {
                        Bicycle bicycle = stationBicycle.getBicycle();
                        return bicycle.getActiveFlag() != null && bicycle.getActiveFlag()
                                && bicycle.getState() == BicycleState.FREE;
                    })
                    .map(stationBicycle -> {
                        Bicycle bicycle = stationBicycle.getBicycle();
                        BicycleDTO bicycleDTO = new BicycleDTO();
                        bicycleDTO.setId(bicycle.getId());
                        bicycleDTO.setState(bicycle.getState().toString());
                        bicycleDTO.setBatteryLevel(bicycle.getBatteryLevel());
                        bicycleDTO.setActiveFlag(bicycle.getActiveFlag());
                        return bicycleDTO;
                    })
                    .collect(Collectors.toList());
            dto.setBicycles(bicycleDTOs);
        }
        return dto;
    }

    @Override
    public CustomResponse deactivateStation(Long stationId) {
        Station station = stationRepository.getStationByIdAndActiveFlagTrue(stationId);
        if (station != null) {
            station.setActiveFlag(false);
            stationRepository.save(station);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.STATION_ALREADY_DEACTIVATED;
    }

    @Override
    public CustomResponse activateStation(Long stationId) {
        Station station = stationRepository.getStationByIdAndActiveFlagFalse(stationId);
        if (station != null) {
            station.setActiveFlag(true);
            stationRepository.save(station);
            return Constants.SUCCESSFUL_OPERATION;
        }
        return Constants.STATION_ALREADY_ACTIVATED;
    }

    @Override
    public StationDTO addStation(double latitude, double longitude, String name) {
        Station station = new Station();
        station.setLatitude(latitude);
        station.setLongitude(longitude);
        station.setStationName(name);
        station.setActiveFlag(true);

        station = stationRepository.save(station);
        return convertToDTO(station);
    }

    @Override
    public StationBicycleDTO findSBConnection(Long bikeId, Long stationId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        Station station = stationRepository.getStationById(stationId);
        StationBicycle sb = sbRepository.findByBicycleAndStation(bicycle, station);

        StationBicycleDTO dto = new StationBicycleDTO();
        dto.setId(sb.getId());
        dto.setBicycle(sb.getBicycle());
        dto.setStation(sb.getStation());
        return dto;
    }

    @Override
    public void deleteSBConnection(Long bikeId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        if (bicycle != null) {
            StationBicycle connection = sbRepository.findStationBicycleByBicycle(bicycle);
            sbRepository.deleteById(connection.getId());
        }
    }

    @Override
    public CustomResponse addBikeToStation(Long bikeId, Long stationId) {
        Bicycle bicycle = bicycleRepository.getBicycleById(bikeId);
        Station station = stationRepository.getStationById(stationId);

        if (bicycle == null) {
            return Constants.BICYCLE_DOESNT_EXIST;
        } else if (station == null) {
            return Constants.STATION_DOESNT_EXIST;
        }

        if (findSBConnection(bikeId, stationId) != null) {
            return Constants.CONNECTION_ALREADY_EXISTS;
        }

        StationBicycle existingBicycleAssociation = sbRepository.findStationBicycleByBicycle(bicycle);
        if (existingBicycleAssociation != null) {
            return Constants.BICYCLE_ALREADY_ADDED_TO_A_STATION;
        }

        List<StationBicycle> stationBicyclesAtStation = sbRepository.findAllBicyclesByStation(station);
        if (stationBicyclesAtStation.size() >= 10) {
            return Constants.STATION_AT_FULL_CAPACITY;
        }

        StationBicycle stationBicycle = new StationBicycle();
        stationBicycle.setBicycle(bicycle);
        stationBicycle.setStation(station);

        sbRepository.save(stationBicycle);

        return Constants.SUCCESSFUL_OPERATION;
    }

    @Override
    public StationDTO findStationById(Long stationId) {
        Station station = stationRepository.getStationById(stationId);
        return convertToDTO(station);
    }
}