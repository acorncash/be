package com.example.demo.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "withdraw")
public class  Withdraw {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer seq;

    @NotNull
    private Integer userSeq;

    @NotNull
    private Integer dotoli;

    @NotNull
    private Integer bankAccountNumber;

    @NotNull
    private String bankAccountName;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createDate;

    @NotNull
    @Column(length = 1)
    private String withdrawYN;
}
