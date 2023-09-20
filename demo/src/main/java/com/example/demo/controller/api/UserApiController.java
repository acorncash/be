package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.List;
import java.util.Optional;

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
    public DTO.JoinResponse Join(@RequestBody @Valid UserFormRequest formRequest) {
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
