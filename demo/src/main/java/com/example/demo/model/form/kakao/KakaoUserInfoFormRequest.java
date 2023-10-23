package com.example.demo.model.form.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoUserInfoFormRequest {
    @JsonProperty("property_keys")
    String propertyKeys;
}
