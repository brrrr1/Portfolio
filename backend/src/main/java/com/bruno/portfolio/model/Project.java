package com.bruno.portfolio.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;

    private String category;

    private Boolean featured;

    private String coverImageUrl;

    private String liveUrl;

    private String githubUrl;

    private String githubUrlFront;

    private String githubUrlBack;

    @Column(name = "display_order")
    private Integer orderIndex;

    @ElementCollection
    @CollectionTable(name = "project_gallery_images", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "image_url")
    private List<String> galleryImages;

    @ElementCollection
    @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> technologies;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "title_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "title_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "title_de", columnDefinition = "TEXT"))
    })
    private LocalizedText title;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "short_description_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "short_description_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "short_description_de", columnDefinition = "TEXT"))
    })
    private LocalizedText shortDescription;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "detailed_description_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "detailed_description_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "detailed_description_de", columnDefinition = "TEXT"))
    })
    private LocalizedText detailedDescription;
}


