package com.example.demo.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "dotoli")
public class Dotoli {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    @NotNull
    private Integer userSeq;

    @NotNull
    private Integer missionSeq;

    @NotNull
    private String missionTitle;

    @NotNull
    private Integer missionDotoli;

    @NotNull
    private Integer userDotoli;

    @NotNull
    private Integer afterDotoli;

    @NotNull
    @Builder.Default
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt = new Date();
}
