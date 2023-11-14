package com.example.demo.model.form;

import com.example.demo.model.enums.SnsType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CompanyAddFormRequest {
    private String name;
    private String mall;
    private String createAt;
}
