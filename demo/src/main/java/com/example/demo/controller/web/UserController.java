package com.example.demo.controller.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

        return "users/ground";
    }

    @GetMapping("new")
    public String createFrom() {
        return "users/modal";
    }
}
