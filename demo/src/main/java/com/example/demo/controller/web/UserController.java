package com.example.demo.controller.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.entity.User;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("users")
@Controller
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public String list(Model model) {
        List<User> users = userService.getAll();
        model.addAttribute("users", users);
        model.addAttribute("allUserCount", userService.getAllUserCount());
        model.addAttribute("todayRegisterUserCount", userService.getTodayRegisterUserCount());
        model.addAttribute("blackUserCount", userService.getBlackUserCount());

        return "member/memberList";
    }

    @GetMapping("new")
    public String createFrom() {
        return "users/add";
    }

    @GetMapping("{id}")
    public String updateFrom(@PathVariable Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);

        return "users/update";
    }
}
