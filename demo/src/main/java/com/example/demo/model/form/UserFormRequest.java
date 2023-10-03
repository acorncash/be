package com.example.demo.model.form;

import lombok.Data;

@Data
public class UserFormRequest {
    private String socialKey;
    private String refreshToken;
    private String id;
    private String password;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String email;
}
