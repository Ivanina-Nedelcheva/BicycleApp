package com.app.bicycle.repositories;

import com.app.bicycle.entities.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, Long> {
    Price findTopByOrderByIdDesc();
}
