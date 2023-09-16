package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Station;
import com.app.bicycle.entities.StationBicycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StationBicycleRepository extends JpaRepository<StationBicycle, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM StationBicycle s")
    int deleteFirstBy();

    StationBicycle findByBicycleAndStation(Bicycle bicycle, Station station);

    StationBicycle findByBicycle(Bicycle bicycle);

    List<StationBicycle> findAllBicyclesByStation(Station station);
}
