package com.example.demo.service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.dto.kakao.KakaoTokenResponse;
import com.example.demo.model.dto.kakao.KakaoUserResponse;
import com.example.demo.model.dto.kakao.KakaoUserResponse.KakaoAccount;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.model.form.kakao.KakaoAccessFormRequest;
import com.example.demo.model.form.kakao.KakaoUserInfoFormRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    //TODO 설정파일로 분리
    private String getUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
    private String getAccessTokenUri = "https://kauth.kakao.com/oauth/token";
    private String grantType = "authorization_code";
    private String clientId = "b2f9c8bcb75d5dc1e65936bcffc386d1";
    private String redirectUri = "http://14.7.33.34:8080/callback/login/kakao";
    private String clientSecret = "EkUMxNxIoTKkBvoNBGv1QwRc0vQ8NpJ0";

    private final UserService userService;

    private ObjectMapper objectMapper = new ObjectMapper();

    public User kakaoLogin(String code) {
        KakaoTokenResponse kakaoToken = getAccessToken(code);
        KakaoAccount userDetail = getUserInfo(kakaoToken).getKakaoUser();

        try {
            return userService.findByEmail(userDetail.getEmail());
        } catch(EntityNotFoundException e) {
            String phoneNumber = null;

            if (userDetail.getPhoneNumber() != null && userDetail.getPhoneNumber().startsWith("+82")) {
                phoneNumber = userDetail.getPhoneNumber().replace("+82 ", "0");
            }
            
            UserFormRequest form = UserFormRequest.builder()
                        .email(userDetail.getEmail())
                        .name(userDetail.getName())
                        .phoneNumber(phoneNumber != null ? phoneNumber : userDetail.getPhoneNumber())
                        .build();

            return userService.insert(form);
        }
        
    }

    private KakaoUserResponse getUserInfo(KakaoTokenResponse token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token.getAccessToken());

        KakaoUserInfoFormRequest body = KakaoUserInfoFormRequest.builder()
                .propertyKeys("[\"kakao_account.email\", \"kakao_account.name\", \"kakao_account.phone_number\"]")
                .build();

        return requestKakao(getUserInfoUrl, HttpMethod.POST, body, KakaoUserResponse.class, headers);
    }

    private KakaoTokenResponse getAccessToken(String code) {
       KakaoAccessFormRequest body = KakaoAccessFormRequest.builder()
               .grantType(grantType)
               .clientId(clientId)
               .redirectUri(redirectUri)
               .code(code)
               .clientSecret(clientSecret)
               .build();

        return requestKakao(getAccessTokenUri,HttpMethod.POST, body, KakaoTokenResponse.class);
    }

    private <BODY, T> T requestKakao(String uri, HttpMethod httpMethod, BODY body, Class<T> responseType) {
        return requestKakao(uri, httpMethod, body, responseType, new HttpHeaders());
    }

    private <BODY, T> T requestKakao(String uri, HttpMethod httpMethod, BODY body, Class<T> responseType, HttpHeaders headers) {
        RestTemplate rest = new RestTemplate();

        headers.add("Context-type", "application/x-www-form-urlencoded;charset=utf-8");

        final Map<String, String> params = objectMapper.convertValue(body, objectMapper.getTypeFactory().constructParametricType(Map.class, String.class, String.class));
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.setAll(params);

        return rest.exchange(uri, httpMethod, new HttpEntity<>(map, headers), responseType).getBody();
    }
}