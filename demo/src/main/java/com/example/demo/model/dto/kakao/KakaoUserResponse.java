package com.example.demo.model.dto.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class KakaoUserResponse {
    private String id;
    @JsonProperty("kakao_account")
    private KakaoAccount kakaoUser;

    @Getter
    public class KakaoAccount {
        private String name;
        @JsonProperty("is_email_valid")
        private Boolean isEmailValid;
        private String email;
    }
}