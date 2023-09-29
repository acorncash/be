package com.example.demo.controller.api;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.form.MissionAddFormRequest;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.service.MissionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mission")
public class MissionApiController {
    private final MissionService missionService;

    @GetMapping("")
    public List<Mission> getMissionAll() {
        return missionService.getMissionAll();
    }

    @GetMapping("{missionSeq}")
    public Optional<Mission> getMission(@PathVariable Integer missionSeq) {
        return missionService.getMissionByMissionSeq(missionSeq);
    }

    @PostMapping("")
    public void createMission(@Valid @RequestBody MissionAddFormRequest request) {
        missionService.createMission(request);
    }

    @PutMapping("rows")
    public void updateRows(@Valid @RequestBody Map<Long, MissionAddFormRequest> formRequest) {
        missionService.updateRows(formRequest);
    }

    @GetMapping("missionByType/{type}")
    public List<Mission> getMissionByMissionType(@PathVariable String type) {
        return missionService.getMissionByMissionType(type);
    }

    @PostMapping("addMission")
    public DTO.Response addMission(@Valid @RequestBody MissionFormRequest formRequest) {
        System.out.println(formRequest.getMissionType());
        System.out.println(formRequest.getTitle());
        System.out.println(formRequest.getDescription());
        System.out.println(formRequest.getUrl());
        System.out.println(formRequest.getImage());
        System.out.println(formRequest.getDotoli());
        System.out.println(formRequest.getAnswer());
        return missionService.addMission(formRequest);
    }

    @PostMapping("answerMission/{missionSeq}/{userSeq}/{answer}")
    public DTO.Response answerMission(@PathVariable Integer missionSeq, @PathVariable Integer userSeq, @PathVariable String answer, HttpServletRequest request) {
        System.out.println(missionSeq);
        System.out.println(userSeq);
        System.out.println(answer);
        return missionService.answerMission(missionSeq, userSeq, answer, request.getRemoteAddr());
    }

    @PostMapping("captureMission/{missionSeq}/{userSeq}/{image}")
    public DTO.Response captureMission(@PathVariable Integer missionSeq, @PathVariable Integer userSeq, @PathVariable String image) {
        System.out.println(missionSeq);
        System.out.println(userSeq);
        System.out.println(image);
        return missionService.captureMission(missionSeq, userSeq, image);
    }

    @PutMapping("{id}")
    public void update(@PathVariable Long id, @Valid @RequestBody MissionFormRequest formRequest) {
        missionService.updateMission(id, formRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        missionService.deleteById(id);
    }
}
