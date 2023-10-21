package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationBicycleRepository extends JpaRepository<StationBicycle, Long> {
    void deleteById(Long id);

    StationBicycle findByBicycleAndStation(Bicycle bicycle, Station station);

    StationBicycle findStationBicycleByBicycle(Bicycle bicycle);

    List<StationBicycle> findAllBicyclesByStation(Station station);
}
