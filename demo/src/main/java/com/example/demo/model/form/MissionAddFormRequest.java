package com.example.demo.model.form;

import java.util.Date;

import com.example.demo.model.enums.SnsType;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MissionAddFormRequest {
    private String missionType;
    private String answer;
    private String title;
    private String description;
    private String keyword;
    private String url;
    private String price;
    private String mall;
    private Integer dotoli;
    private Integer limitCount;
    private Integer attendCount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date startAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date endAt;
    private SnsType snsType;
}
