package com.app.bicycle.repositories;

import com.app.bicycle.entities.Rental;
import com.app.bicycle.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    @Query("SELECT count(r) FROM Rental r WHERE r.user = :userId AND r.finished = false")
    Long checkUserRentals(User userId);
}
