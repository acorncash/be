package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.service.MissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mission")
public class MissionApiController {
    private final MissionService missionService;

    @GetMapping("{type}")
    public List<Mission> getMissionList(@PathVariable String type) {
        return missionService.getMissionByMissionType(type);
    }

    @GetMapping("{missionSeq}")
    public Optional<Mission> getMission(@PathVariable Long missionSeq) {
        return missionService.getMissionByMissionSeq(missionSeq);
    }

    @PostMapping("")
    public DTO.Response addMission(@Valid @RequestBody MissionFormRequest formRequest) {
        System.out.println(formRequest.getMissionType());
        System.out.println(formRequest.getTitle());
        System.out.println(formRequest.getDescription());
        System.out.println(formRequest.getImage());
        System.out.println(formRequest.getDotoli());
        System.out.println(formRequest.getAnswer());
        return missionService.addMission(formRequest);
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
