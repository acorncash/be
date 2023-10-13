package com.example.demo.model.form;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeFormRequest {
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date postFrom;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date postTo;
    private String status;
    @NotNull
    private Boolean topStatus;
}
