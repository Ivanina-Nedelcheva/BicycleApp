package com.app.bicycle.repositories;

import com.app.bicycle.entities.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    List<Station> findByActiveFlagTrue();
    Station getStationsById(Long stationId);
}
