package com.example.demo.controller.api;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.StringUtils;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {
    private final UserService userService;

    @GetMapping("")
    public List<User> getAllUser() {
        return userService.getAll();
    }

    @GetMapping("login/{socialKey}/{userMail}")
    public Optional<User> login(@PathVariable String socialKey, @PathVariable String userMail) {
        System.out.println(socialKey + userMail);
        if(StringUtils.isEmpty(socialKey) || StringUtils.isEmpty(userMail)){
            throw new IllegalStateException("아이디와 비밀번호를 확인해주세요.");
        }

        return userService.getUserBySocialKeyAndUserMail(socialKey, userMail);
    }

    @PostMapping("join")
    public DTO.JoinResponse Join(@Valid UserFormRequest formRequest) {
        System.out.println(formRequest.getName());
        return userService.Join(formRequest);
    }

    @PutMapping("{id}")
    public void update(@PathVariable Long id, @Valid UserFormRequest formRequest) {
        userService.update(id, formRequest);
    }

    @PutMapping("block")
    public void blockUser(@Valid @RequestBody UserBlockFormRequest request) {
        userService.blockUser(request);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
