package com.app.bicycle.repositories;

import com.app.bicycle.entities.FaultReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaultReportRepository extends JpaRepository<FaultReport, Long> {

}
