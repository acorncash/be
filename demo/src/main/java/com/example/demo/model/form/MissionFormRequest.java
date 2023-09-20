package com.example.demo.model.form;

import lombok.Data;

@Data
public class MissionFormRequest {
    private String missionType;
    private String title;
    private String description;
    private String image;
    private Integer dotoli;
    private String answer;
}
