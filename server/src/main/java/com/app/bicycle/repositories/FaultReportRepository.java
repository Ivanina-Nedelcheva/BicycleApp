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
}
