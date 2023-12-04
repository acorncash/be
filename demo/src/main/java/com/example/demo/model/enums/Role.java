package com.example.demo.model.enums;

public enum Role {
    ROLE_USER("user"), ROLE_ADMIN("admin");

    private String code;

    Role(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
