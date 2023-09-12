package com.example.demo.controller;

import com.example.demo.DTO.DTO;
import com.example.demo.Entity.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public List<User> getAllUser() {
        return userService.getAll();
    }

    @GetMapping("/login/{socialKey}/{userMail}")
    public Optional<User> login(@PathVariable String socialKey, @PathVariable String userMail) {
        System.out.println(socialKey + userMail);
        if(StringUtils.isEmpty(socialKey) || StringUtils.isEmpty(userMail)){
            throw new IllegalStateException("아이디와 비밀번호를 확인해주세요.");
        }

        return userService.getUserBySocialKeyAndUserMail(socialKey, userMail);
    }

    @PostMapping("/join")
    public DTO.JoinResponse Join(@Valid @RequestBody final DTO.JoinRequest joinRequest) {
        System.out.println(joinRequest.getName());
        return userService.Join(joinRequest);
    }
}
