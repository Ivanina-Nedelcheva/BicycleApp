package com.app.bicycle.repositories;

import com.app.bicycle.entities.FaultReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaultReportRepository extends JpaRepository<FaultReport, Long> {
    @Query("SELECT fr FROM FaultReport fr")
    List<FaultReport> getAllReports();

    @Query("SELECT COUNT(fr) FROM FaultReport fr WHERE fr.bicycle.id = :bikeId")
    long reportExists(Long bikeId);

    @Query("SELECT fr FROM FaultReport fr WHERE fr.bicycle.id = :bikeId")
    FaultReport getFaultReportByBicycle(Long bikeId);

    List<FaultReport> findAllByOrderByDateDesc();
}
