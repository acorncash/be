package com.example.demo.controller.web;

import com.example.demo.model.entity.Notice;
import com.example.demo.service.MissionService;
import com.example.demo.service.NoticeService;
import com.example.demo.service.WithdrawService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping("config")
@Controller
public class ConfigController {
    private final MissionService missionService;
    private final NoticeService noticeService;
    private final WithdrawService withdrawService;
    private final CompanyService companyService;

    @GetMapping("notice")
    public String noticeList(Model model) {
        model.addAttribute("noticeList", noticeService.getAll());
        
        return "config/noticeList";
    }

    @GetMapping("noticeDtl/new")
    public String noticeDtlList(Model model) {
        model.addAttribute("notice", new Notice());
        
        return "config/noticeDtl";
    }

    @GetMapping("noticeDtl/{seq}")
    public String noticeDtlList(Model model, @PathVariable Integer seq) {
        model.addAttribute("notice", noticeService.findById(seq));
        
        return "config/noticeDtl";
    }

    @GetMapping("withdraw")
    public String withdrawList(Model model) {
        model.addAttribute("withdrawList", withdrawService.getWithdrawAll());
        model.addAttribute("allWithdrawCount", withdrawService.getCount());
        model.addAttribute("doneWithdrawCount", withdrawService.getCountByWithdraw("Y"));
        model.addAttribute("waitingWithdrawCount", withdrawService.getCountByWithdraw("N"));

        return "config/withdrawList";
    }

    @GetMapping("company")
    public String companyList(Model model) {
        model.addAttribute("companyList", noticeService.getAll());

        return "config/companyList";
    }
}
