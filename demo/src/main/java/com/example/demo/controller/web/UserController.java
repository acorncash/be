package com.example.demo.controller.web;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.dto.PageDTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.User;
import com.example.demo.service.DotoliService;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("users")
@Controller
public class UserController {
    private final UserService userService;
    private final DotoliService dotoliService;

    @GetMapping("user")
    public String list(Model model, @RequestParam String searchType, @RequestParam String searchContent, @PageableDefault() Pageable pageable) {
        PageDTO<User> users = userService.getAllUser(searchType, searchContent, pageable);

        LinkedHashMap<String, String> searchTypes = new LinkedHashMap<>();
        searchTypes.put("name", "이름");
        searchTypes.put("nickname", "닉네임");
        searchTypes.put("phoneNumber", "전화번호");
        searchTypes.put("email", "이메일");
        model.addAttribute("searchTypes", searchTypes);
        model.addAttribute("searchType", searchType);
        model.addAttribute("searchContent", searchContent);

        model.addAttribute("page", users);
        model.addAttribute("allUserCount", userService.getAllUserCount());
        model.addAttribute("todayRegisterUserCount", userService.getTodayRegisterUserCount());
        model.addAttribute("blockUserCount", userService.getBlockUserCount());

        return "member/memberList";
    }

    @GetMapping("new")
    public String createFrom() {
        return "users/add";
    }

    @GetMapping("{id}")
    public String updateFrom(@PathVariable Integer id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);

        return "users/update";
    }

    @GetMapping("visitor")
    public String visitorList(Model model) {
        List<Dotoli> dotolis = dotoliService.getDotoliAll();
        model.addAttribute("dotolis", dotolis);
        
        return "member/visitorList";
    }
}
