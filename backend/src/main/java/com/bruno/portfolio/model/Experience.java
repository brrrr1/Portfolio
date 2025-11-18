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
@Table(name = "experiences")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;

    private String companyUrl;

    private String logoUrl;

    @Column(name = "display_order")
    private Integer orderIndex;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "role_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "role_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "role_de", columnDefinition = "TEXT"))
    })
    private LocalizedText role;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "description_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "description_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "description_de", columnDefinition = "TEXT"))
    })
    private LocalizedText description;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "location_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "location_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "location_de", columnDefinition = "TEXT"))
    })
    private LocalizedText location;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "date_range_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "date_range_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "date_range_de", columnDefinition = "TEXT"))
    })
    private LocalizedText dateRange;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "es", column = @Column(name = "work_mode_es", columnDefinition = "TEXT")),
            @AttributeOverride(name = "en", column = @Column(name = "work_mode_en", columnDefinition = "TEXT")),
            @AttributeOverride(name = "de", column = @Column(name = "work_mode_de", columnDefinition = "TEXT"))
    })
    private LocalizedText workMode;
}


