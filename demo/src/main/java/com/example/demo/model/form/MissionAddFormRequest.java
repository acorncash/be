package com.example.demo.model.form;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MissionAddFormRequest {
    private String missionType;
    private String title;
    private String description;
    private String url;
    private Integer dotoli;
    private Integer limitCount;
    private Date startAt;
    private Date endAt;
}
