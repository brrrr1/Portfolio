package com.bruno.portfolio.repository;

import com.bruno.portfolio.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByOrderByOrderIndexAsc();
}


