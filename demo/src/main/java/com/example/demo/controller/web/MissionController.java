package com.example.demo.controller.web;

import java.util.LinkedHashMap;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.service.CaptureMissionService;
import com.example.demo.service.CompanyService;
import com.example.demo.service.MissionService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("mission")
@Controller
public class MissionController {
    private final MissionService missionService;
    private final CompanyService companyService;
    private final CaptureMissionService captureMissionService;

    @GetMapping("answer")
    public String answerList(Model model, @RequestParam(defaultValue = "all") String searchType, @RequestParam(required = false) String searchContent, @PageableDefault() Pageable pageable) {
        model.addAttribute("page", missionService.getMissionByMissionType("A", searchType, searchContent, pageable));
        model.addAttribute("companys", companyService.getCompanyAll());
        model.addAttribute("searchType", searchType);
        model.addAttribute("searchContent", searchContent);

        LinkedHashMap<String, String> searchTypes = new LinkedHashMap<>();
        searchTypes.put("all", "전체");
        searchTypes.put("title", "제목");
        searchTypes.put("description", "내용");
        searchTypes.put("keyword", "키워드");
        model.addAttribute("searchTypes", searchTypes);
        
        return "mission/answerList";
    }

    @GetMapping("doit")
    public String doitList(Model model, @RequestParam(defaultValue = "all") String searchType, @RequestParam(required = false) String searchContent, @PageableDefault() Pageable pageable) {
        return "mission/doitList";
    }

    @GetMapping("photo")
    public String photoList(Model model, @RequestParam(defaultValue = "all") String searchType, @RequestParam(required = false) String searchContent, @PageableDefault() Pageable pageable) {
        model.addAttribute("page", missionService.getMissionByMissionType("C", searchType, searchContent, pageable));

        model.addAttribute("searchType", searchType);
        model.addAttribute("searchContent", searchContent);

        LinkedHashMap<String, String> searchTypes = new LinkedHashMap<>();
        searchTypes.put("all", "전체");
        searchTypes.put("title", "제목");
        searchTypes.put("description", "내용");
        searchTypes.put("keyword", "키워드");
        model.addAttribute("searchTypes", searchTypes);

        return "mission/photoList";
    }

    @GetMapping("content")
    public String contentList(Model model, @RequestParam(defaultValue = "all") String searchType, @RequestParam(required = false) String searchContent, @PageableDefault() Pageable pageable) {
        model.addAttribute("captureMissions", captureMissionService.getAll());
        
        return "mission/contentList";
    }
}
