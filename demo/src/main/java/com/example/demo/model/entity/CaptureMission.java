package com.example.demo.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "captureMission")
public class CaptureMission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    @NotNull
    private Integer userSeq;

    @NotNull
    private Integer missionSeq;

    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @NotNull
    @Builder.Default
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt = new Date();

    @Builder.Default
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date confirmAt = new Date();

    @NotNull
    @Builder.Default
    @Column(length = 1)
    private String confirmYn = "N";

    @NotNull
    @Builder.Default
    @Column(length = 1)
    private String delYn = "N";

    @ManyToOne(fetch = FetchType.LAZY)
    @Builder.Default
    @JoinColumn(name = "userSeq", insertable = false, updatable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT), nullable = false)
    private User user = new User();

    @ManyToOne(fetch = FetchType.LAZY)
    @Builder.Default
    @JoinColumn(name = "missionSeq", insertable = false, updatable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT), nullable = false)
    private Mission mission = new Mission();
}
