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
@Entity(name = "mission")
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    @NotNull
    private String missionType;

    @NotNull
    private String title;

    @NotNull
    private String description;

    private String url;

    private String image;

    @NotNull
    private Integer dotoli;

    private String answer;

    @NotNull
    private Integer attendCnt;

    @NotNull
    @Builder.Default
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt = new Date();

    @NotNull
    @Builder.Default
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateAt = new Date();

    @NotNull
    @Builder.Default
    @Column(length = 1)
    private String delYn = "N";

}
