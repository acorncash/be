package com.example.demo.service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.dto.naver.NaverTokenResponse;
import com.example.demo.model.dto.naver.NaverUesrResponse;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.naver.NaverAccessFormRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intellij.openapi.components.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NaverLoginService {
    //TODO 설정파일로 분리
    private String getUserInfoUrl = "https://openapi.naver.com/v1/nid/me";
    private String getAccessTokenUri = "https://nid.naver.com/oauth2.0/token";
    private String grantType = "authorization_code";
    private String clientId = "";
    private String clientSecret = "";

    private final UserService userService;

    private ObjectMapper objectMapper = new ObjectMapper();

    public User naverLogin(String code, String state) {
        NaverTokenResponse naverToken = getAccessToken(code, state);
        NaverUesrResponse userInfo = getUserInfo(naverToken);

        return userService.findByEmail(userInfo.getResponse().getEmail());
    }

    private NaverUesrResponse getUserInfo(NaverTokenResponse token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token.getAccessToken());

        return requestNaver(getUserInfoUrl, HttpMethod.POST, null, NaverUesrResponse.class, headers);
    }

    private NaverTokenResponse getAccessToken(String code, String state) {
        NaverAccessFormRequest body = NaverAccessFormRequest.builder()
               .grantType(grantType)
               .clientId(clientId)
               .code(code)
               .state(state)
               .clientSecret(clientSecret)
               .build();

        return requestNaver(getAccessTokenUri,HttpMethod.POST, body, NaverTokenResponse.class);
    }

    private <BODY, T> T requestNaver(String uri, HttpMethod httpMethod, BODY body, Class<T> responseType) {
        return requestNaver(uri, httpMethod, body, responseType, new HttpHeaders());
    }

    private <BODY, T> T requestNaver(String uri, HttpMethod httpMethod, BODY body, Class<T> responseType, HttpHeaders headers) {
        RestTemplate rest = new RestTemplate();

        headers.add("Context-type", "application/json;charset=utf-8");

        final Map<String, String> params = objectMapper.convertValue(body, objectMapper.getTypeFactory().constructParametricType(Map.class, String.class, String.class));
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.setAll(params);

        return rest.exchange(uri, httpMethod, new HttpEntity<>(map, headers), responseType).getBody();
    }
}
