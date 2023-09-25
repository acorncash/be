package com.example.demo.model.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DotoliHistoryResponse {
    private String missionType;
    private String missionName;
    private String userName;
    private Integer dotoli;
    private Integer totoalDotoli;
    private String ipAddress;
    private Date createAt;
}
