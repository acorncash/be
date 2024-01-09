package com.example.demo.controller.web;

import com.example.demo.model.dto.PageDTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.service.CaptureMissionService;
import com.example.demo.service.MissionService;
import com.example.demo.service.CompanyService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public String answerList(Model model, @PageableDefault() Pageable pageable) {
        model.addAttribute("page", missionService.getMissionByMissionType("A", pageable));
        model.addAttribute("companys", companyService.getCompanyAll());
        return "mission/answerList";
    }

    @GetMapping("doit")
    public String doitList(Model model, @PageableDefault() Pageable pageable) {
        return "mission/doitList";
    }

    @GetMapping("photo")
    public String photoList(Model model, @PageableDefault() Pageable pageable) {
        model.addAttribute("page", missionService.getMissionByMissionType("C", pageable));

        return "mission/photoList";
    }

    @GetMapping("content")
    public String contentList(Model model, @PageableDefault() Pageable pageable) {
        model.addAttribute("captureMissions", captureMissionService.getAll());
        
        return "mission/contentList";
    }
}
