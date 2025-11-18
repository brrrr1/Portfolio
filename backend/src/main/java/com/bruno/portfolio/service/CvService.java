package com.bruno.portfolio.service;

import com.bruno.portfolio.dto.CvMetadataDto;
import com.bruno.portfolio.model.CvDocument;
import com.bruno.portfolio.model.Language;
import com.bruno.portfolio.repository.CvDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CvService {

    private final CvDocumentRepository cvDocumentRepository;

    public CvDocument getDocument(Language language) {
        return cvDocumentRepository.findByLanguage(language)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found"));
    }

    public List<CvMetadataDto> getMetadata() {
        return cvDocumentRepository.findAll().stream()
                .map(doc -> new CvMetadataDto(doc.getLanguage(), doc.getFileName(), doc.getUpdatedAt()))
                .toList();
    }

    @Transactional
    public CvMetadataDto upload(Language language, MultipartFile file) {
        try {
            CvDocument document = cvDocumentRepository.findByLanguage(language)
                    .orElse(CvDocument.builder().language(language).build());

            document.setFileName(file.getOriginalFilename());
            document.setContentType(file.getContentType());
            document.setData(file.getBytes());
            document.setUpdatedAt(Instant.now());

            CvDocument saved = cvDocumentRepository.save(document);
            return new CvMetadataDto(saved.getLanguage(), saved.getFileName(), saved.getUpdatedAt());
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to read file", ex);
        }
    }
}


