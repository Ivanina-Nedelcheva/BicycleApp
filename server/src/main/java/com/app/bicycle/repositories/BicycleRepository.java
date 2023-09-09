package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BicycleRepository extends JpaRepository<Bicycle, Long> {
    Bicycle getBicycleById(Long bikeId);

    @Query("SELECT b FROM Bicycle b WHERE b.state = 'FREE' AND b.batteryLevel = 100 AND b.activeFlag = true")
    List<Bicycle> getAllFreeActiveBicyclesWithFullCharge();

    Bicycle getBicycleByIdAndActiveFlagTrue(Long bikeId);

    Bicycle getBicycleByIdAndActiveFlagFalse(Long bikeId);

    @Query("SELECT MAX(b.id) FROM Bicycle b")
    Long getMaxBicycleId();
}
