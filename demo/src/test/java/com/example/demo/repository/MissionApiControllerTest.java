package com.example.demo.repository;

import com.example.demo.model.entity.Mission;
import com.example.demo.service.MissionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@Transactional
public class MissionApiControllerTest {

    @Autowired
    private MissionService missionService;

    @Test
    void getMissionListTest(){
        List<Mission> missionList = missionService.getMissionByMissionType("A");
        for (Mission mission : missionList) {
            System.out.println(mission.getSeq());
        }
    }
}
