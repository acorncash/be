package com.example.demo.Entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    private String socialKey;

    @NotNull
    private String userMail;

    @NotNull
    private String name;

    private String phoneNumber;

    private String nickname;

    @NotNull
    private Integer dotoli;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createDate;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateDate;

    @NotNull
    @Column(length = 1)
    private String delYN;
}
