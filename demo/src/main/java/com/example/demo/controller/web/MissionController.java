package com.example.demo.controller.web;

import com.example.demo.service.MissionService;
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

    @GetMapping("answer")
    public String answerList(Model model) {
        return "mission/answerList";
    }

    @GetMapping("doit")
    public String doitList(Model model) {
        return "mission/doitList";
    }

    @GetMapping("photo")
    public String photoList(Model model) {
        return "mission/photoList";
    }

    @GetMapping("content")
    public String contentList(Model model) {
        return "mission/contentList";
    }
}
