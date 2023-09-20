package com.example.demo.model.form;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateFormRequest {
    private String name;
    private String nickname;
    private String phoneNumber;
    private String email;
    private String socialKey;
}
