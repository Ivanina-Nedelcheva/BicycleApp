package com.app.bicycle.repositories;

import com.app.bicycle.entities.Bicycle;
import com.app.bicycle.entities.Rental;
import com.app.bicycle.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    @Query("SELECT count(r) FROM Rental r WHERE r.user = :userId AND r.finished = false")
    Long checkUserRentals(User userId);

    List<Rental> findRentalByFinishedTrue();

    List<Rental> findRentalByUserAndFinishedTrue(User userId);

    Rental findRentalByUserAndFinishedFalse(User user);

    Rental findTopByUser(User user);
}