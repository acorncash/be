package com.example.demo.model.enums;

public enum SnsType {
    NAVER("0001"), INSTAGRAM("0002"), KAKAO("0003"), MUSINSA("0004");

    private final String code;

    SnsType(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
