package com.example.demo.repository;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.service.MissionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
public class MissionApiControllerTest {

    @Autowired
    private MissionService missionService;

    @Test
    void getSelectTest(){
        List<Mission> missionList = missionService.getMissionAll();
        for (Mission mission : missionList) {
            System.out.println(mission.getSeq());
        }

        Optional<Mission> missionByMissionSeq = missionService.getMissionByMissionSeq(502);
        System.out.println(missionByMissionSeq.get().getSeq());

        List<Mission> missionListByMissionType = missionService.getMissionByMissionType("A");
        for (Mission mission : missionListByMissionType) {
            System.out.println(mission.getSeq());
        }
    }

    @Test
    void getAddMission(){
        MissionFormRequest formRequest = new MissionFormRequest();
        DTO.Response response;

        formRequest.setMissionType("A");
        formRequest.setTitle("타이틀");
        formRequest.setDescription("description");
        formRequest.setUrl("url");
        formRequest.setImage("image");
        formRequest.setDotoli(1000);
        formRequest.setAnswer("정답은answer");

        response = missionService.addMission(formRequest);
        System.out.println("Status : " + response.getStatus());
        System.out.println("Message : " + response.getMessage());

        response = missionService.answerMission(502, 703, "답", "0:0:0:0:0:0:0:1");
        System.out.println("Status : " + response.getStatus());
        System.out.println("Message : " + response.getMessage());

        response = missionService.captureMission(503, 703, "답");
        System.out.println("Status : " + response.getStatus());
        System.out.println("Message : " + response.getMessage());
    }
}
