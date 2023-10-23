package com.example.demo.model.form.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoAccessFormRequest {
    @JsonProperty("grant_type")
    private String grantType;
    @JsonProperty("client_id")
    private String clientId;
    @JsonProperty("redirect_uri")
    private String redirectUri;
    @JsonProperty("code")
    private String code;
    @JsonProperty("client_secret")
    private String clientSecret;
}
