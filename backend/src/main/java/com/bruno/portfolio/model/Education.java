package com.bruno.portfolio.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "educations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String institution;

    private String logoUrl;

    private String yearRange;

    @Column(name = "display_order")
    private Integer orderIndex;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "degree_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "degree_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "degree_de", columnDefinition = "TEXT"))
    })
    private LocalizedText degree;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "description_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "description_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "description_de", columnDefinition = "TEXT"))
    })
    private LocalizedText description;
}


