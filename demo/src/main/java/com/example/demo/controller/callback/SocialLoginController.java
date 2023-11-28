package com.example.demo.controller.callback;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.entity.User;
import com.example.demo.service.KakaoLoginService;
import com.example.demo.service.NaverLoginService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/callback/login")
public class SocialLoginController {
    private final KakaoLoginService kakaoLoginService;
    private final NaverLoginService naverLoginService;

    @GetMapping("kakao")
    public String kakaoLogin(String code, Model model) throws Exception {
        User user = kakaoLoginService.kakaoLogin(code);
        model.addAttribute("user", user);

        return "callback/callback";
    }

    @GetMapping("naver")
    public String naverLogin(String code, String state, Model model) throws Exception {
        User user = naverLoginService.naverLogin(code, state);
        model.addAttribute("user", user);

        return "callback/callback";
    }
}
