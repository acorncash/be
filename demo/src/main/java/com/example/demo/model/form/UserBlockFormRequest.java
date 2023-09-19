package com.example.demo.model.form;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserBlockFormRequest {
    @NotNull
    Set<Integer> blockList;
    @NotBlank
    String blockStatus;
}
