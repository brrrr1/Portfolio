package com.bruno.portfolio.repository;

import com.bruno.portfolio.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByOrderByOrderIndexAsc();
}


