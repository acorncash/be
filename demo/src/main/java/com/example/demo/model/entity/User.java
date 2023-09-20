package com.example.demo.model.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    @NotNull
    private String id;

    @NotNull
    private String password;

    @NotNull
    private String name;

    private String nickname;

    private String socialKey;

    @NotNull
    private String userMail;

    private String phoneNumber;

    @NotNull
    private Integer dotoli;

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

    @NotNull
    @Builder.Default
    @Column(length = 1)
    private String blockYn = "N";
}
