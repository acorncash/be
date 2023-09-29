package com.example.demo.model.form;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class WithdrawFromRequest {
    private Integer userSeq;
    private Integer dotoli;
    private String bankAccountNumber;
    private String bankAccountName;
}
