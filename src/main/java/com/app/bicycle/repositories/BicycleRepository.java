package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BicycleRepository extends JpaRepository<Bicycle, Long> {
}
