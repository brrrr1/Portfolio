package com.bruno.portfolio.repository;

import com.bruno.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByOrderIndexAsc();
    Optional<Project> findBySlug(String slug);
    boolean existsBySlug(String slug);
}


