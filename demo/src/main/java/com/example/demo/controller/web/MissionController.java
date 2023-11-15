package com.example.demo.controller.web;

import com.example.demo.service.CaptureMissionService;
import com.example.demo.service.MissionService;
import com.example.demo.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping("mission")
@Controller
public class MissionController {
    private final MissionService missionService;
    private final CompanyService companyService;
    private final CaptureMissionService captureMissionService;

    @GetMapping("answer")
    public String answerList(Model model) {
        model.addAttribute("missions", missionService.getMissionByMissionType("A"));
        model.addAttribute("companys", companyService.getCompanyAll());
        return "mission/answerList";
    }

    @GetMapping("doit")
    public String doitList(Model model) {
        return "mission/doitList";
    }

    @GetMapping("photo")
    public String photoList(Model model) {
        model.addAttribute("missions", missionService.getMissionByMissionType("C"));

        return "mission/photoList";
    }

    @GetMapping("content")
    public String contentList(Model model) {
        model.addAttribute("captureMissions", captureMissionService.getAll());
        
        return "mission/contentList";
    }
}
