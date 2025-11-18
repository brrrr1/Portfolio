package com.bruno.portfolio.repository;

import com.bruno.portfolio.model.CvDocument;
import com.bruno.portfolio.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CvDocumentRepository extends JpaRepository<CvDocument, Long> {
    Optional<CvDocument> findByLanguage(Language language);
}


