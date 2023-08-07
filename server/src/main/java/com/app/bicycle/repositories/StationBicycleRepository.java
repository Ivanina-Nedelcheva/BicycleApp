package com.app.bicycle.repositories;

import com.app.bicycle.entities.StationBicycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationBicycleRepository extends JpaRepository<StationBicycle, Long> {

}
