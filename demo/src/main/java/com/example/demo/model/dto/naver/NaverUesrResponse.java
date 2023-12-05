package com.example.demo.model.dto.naver;

import lombok.Getter;

@Getter
public class NaverUesrResponse {
    private String resultCode;
    private String message;
    private User response;

    @Getter
    public class User {
        private String id;
        private String nickname;
        private String name;
        private String email;
        private String mobile;
    }
}
