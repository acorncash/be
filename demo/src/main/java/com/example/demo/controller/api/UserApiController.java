package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Recommend;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.model.form.UserUpdateFormRequest;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {
    private final UserService userService;

    @GetMapping("")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @GetMapping("{userSeq}")
    public Optional<User> getUser(@PathVariable Integer userSeq) {
        return userService.getUser(userSeq);
    }

    @GetMapping("login/{socialKey}/{refreshToken}")
    public Optional<User> login(@PathVariable String socialKey, @PathVariable String refreshToken) {
        System.out.println(socialKey + refreshToken);

        return userService.getUserBySocialKeyAndUserMail(socialKey, refreshToken);
    }

    @GetMapping("recommendList/{userSeq}")
    public List<Recommend> recommendList(@PathVariable Integer userSeq) {
        return userService.getRecommendList(userSeq);
    }

    @GetMapping("dotoliByUser/{userSeq}")
    public Optional<User> getDotoliByUser(@PathVariable Integer userSeq) {
        return userService.getDotoliByUser(userSeq);
    }

    @GetMapping("dotoliByDotoli/{userSeq}")
    public List<Dotoli> getDotoliByDotoli(@PathVariable Integer userSeq) {
        return userService.getDotoliByDotoli(userSeq);
    }

    @PostMapping("join")
    public DTO.JoinResponse Join(@Valid @RequestBody UserFormRequest formRequest) {
        System.out.println(formRequest.getSocialKey());
        System.out.println(formRequest.getRefreshToken());
        System.out.println(formRequest.getId());
        System.out.println(formRequest.getPassword());
        System.out.println(formRequest.getName());
        System.out.println(formRequest.getNickname());
        System.out.println(formRequest.getPhoneNumber());
        System.out.println(formRequest.getEmail());
        return userService.Join(formRequest);
    }

    @PutMapping("{id}")
    public void update(@PathVariable Integer id, @Valid @RequestBody UserUpdateFormRequest formRequest) {
        userService.update(id, formRequest);
    }

    @PutMapping("rows")
    public void updateRows(@Valid @RequestBody Map<Integer, UserUpdateFormRequest> formRequest) {
        userService.updateRows(formRequest);
    }

    @PutMapping("block")
    public void blockUser(@Valid @RequestBody UserBlockFormRequest request) {
        userService.blockUser(request);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @GetMapping("/token")
    public CsrfToken getCsrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }

    @PostMapping("recommend/{userSeq}/{email}")
    public DTO.JoinResponse recommend(@PathVariable Integer userSeq, @PathVariable String email) {
        System.out.println(userSeq);
        System.out.println(email);

        return userService.recommend(userSeq, email);
    }
}
