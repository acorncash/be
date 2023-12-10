package com.example.demo.model.form;

import java.util.Date;

import com.example.demo.model.enums.SnsType;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdPopcornFormRequest {
    private Integer usn;
    private String reward_key;
    private Integer quantity;
    private String campaign_key;
    private String signed_value;
}
