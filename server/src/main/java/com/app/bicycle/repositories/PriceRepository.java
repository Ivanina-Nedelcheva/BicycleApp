package com.app.bicycle.repositories;

import com.app.bicycle.entities.Prices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Prices, Long> {
    Prices findTopByOrderByIdDesc();
}
