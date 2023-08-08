package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BicycleRepository extends JpaRepository<Bicycle, Long> {
    Bicycle getBicycleById(Long bikeId);
    @Query("SELECT MAX(b.id) FROM Bicycle b")
    Long getMaxBicycleId();
}
