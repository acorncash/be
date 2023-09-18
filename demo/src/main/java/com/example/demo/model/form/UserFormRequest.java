package com.example.demo.model.form;

import lombok.Data;

@Data
public class UserFormRequest {
    private String id;
    private String passwprd;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String email;
}
