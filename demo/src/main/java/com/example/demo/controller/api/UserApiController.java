package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.model.form.UserUpdateFormRequest;
import com.example.demo.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {
    private final UserService userService;

    @GetMapping("")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @GetMapping("{userSeq}")
    public Optional<User> getUser(@PathVariable Integer userSeq) {
        return userService.getUser(userSeq);
    }

    @GetMapping("login/{socialKey}/{refreshToken}")
    public Optional<User> login(@PathVariable String socialKey, @PathVariable String refreshToken) {
        System.out.println(socialKey + refreshToken);

        return userService.getUserBySocialKeyAndUserMail(socialKey, refreshToken);
    }

    @PostMapping("join")
    public DTO.JoinResponse Join(@Valid @RequestBody UserFormRequest formRequest) {
        System.out.println(formRequest.getSocialKey());
        System.out.println(formRequest.getRefreshToken());
        System.out.println(formRequest.getId());
        System.out.println(formRequest.getPassword());
        System.out.println(formRequest.getName());
        System.out.println(formRequest.getNickname());
        System.out.println(formRequest.getPhoneNumber());
        System.out.println(formRequest.getEmail());
        return userService.Join(formRequest);
    }

    @PutMapping("{id}")
    public void update(@PathVariable Integer id, @Valid @RequestBody UserUpdateFormRequest formRequest) {
        userService.update(id, formRequest);
    }

    @PutMapping("rows")
    public void updateRows(@Valid @RequestBody Map<Integer, UserUpdateFormRequest> formRequest) {
        userService.updateRows(formRequest);
    }

    @PutMapping("block")
    public void blockUser(@Valid @RequestBody UserBlockFormRequest request) {
        userService.blockUser(request);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        userService.deleteById(id);
    }

    @GetMapping("/kakao")
    public void kakaoLogin(String code, HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            System.out.println(code);

            RestTemplate rest = new RestTemplate();

            // 사용자 인증정보 받기 위한 세팅
            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("grant_type", "authorization_code");
            map.add("client_id", "b2f9c8bcb75d5dc1e65936bcffc386d1");
            map.add("redirect_uri", "http://localhost:8080/api/user/kakao");
            map.add("code", code);
            map.add("client_secret", "EkUMxNxIoTKkBvoNBGv1QwRc0vQ8NpJ0");

            HttpHeaders headers = new HttpHeaders();
            headers.add("Context-type", "application/x-www-form-urlencoded;charset=utf-8");

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

            // 사용자 인증정보 요청
            ResponseEntity<Map> rs = rest.postForEntity("https://kauth.kakao.com/oauth/token", entity, Map.class);

            // access_token, refresh_token Get
            String Idtoken = rs.getBody().get("id_token").toString();
            String Access = rs.getBody().get("access_token").toString();
            String Refresh = rs.getBody().get("refresh_token").toString();
            System.out.println(Idtoken);
            System.out.println(Access);
            System.out.println(Refresh);

//            //Base64 디코딩
//            byte[] decodeByte = Base64.decodeBase64(Idtoken);
//            System.out.println(new String(decodeByte));
//
//            JSONParser jsonParser = new JSONParser();
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(new String(decodeByte));
//            System.out.println(jsonObject);






            // Cookie, Response
            // Angular로 Redirect
            Cookie accessCookie = new Cookie("access_token", Access);// 쿠키생성
            Cookie refreshCookie = new Cookie("refresh_token", Refresh);// 쿠키생성
            Cookie userSeqCookie = new Cookie("userSeq", "809");// 쿠키생성

            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            response.addCookie(userSeqCookie);

            response.sendRedirect("http://localhost:8100/login");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
