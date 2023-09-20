package com.example.demo.controller.web;

import com.example.demo.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping("config")
@Controller
public class ConfigController {
    private final MissionService missionService;

    @GetMapping("notice")
    public String noticeList(Model model) {
        return "config/noticeList";
    }

    @GetMapping("withdraw")
    public String withdrawList(Model model) {
        return "config/withdrawList";
    }
}
