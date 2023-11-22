package com.example.demo.controller.api;

import com.example.demo.model.entity.User;
import com.example.demo.repository.UserInterface;
import com.example.demo.service.DotoliService;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kakao-gift")
public class KakaoGiftController {
    private final UserService userService;
    private final DotoliService dotoliService;
    private final UserInterface userRepository;

    // Kakao Gift Biz API 키
    private static final String KAKAO_GIFT_BIZ_REST_APP_KEY = "b2f9c8bcb75d5dc1e65936bcffc386d1";

    // API 호출을 위한 OkHttp 클라이언트
    private OkHttpClient client = new OkHttpClient();
    private ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/sendGift/{seq}/{token}")
    public Map<String, Object> sendGift(HttpServletRequest request, @PathVariable int seq, @PathVariable String token) throws IOException, InterruptedException {
        MediaType mediaType = MediaType.parse("application/json");
        User user = userRepository.findById(seq).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        // 클라이언트의 공인 IP 주소 가져오기
        String clientIpAddress = getClientIpAddress(request);

        // 발송 요청 바디
        String requestBodyJson = "{\"receiver_type\":\"PHONE\",\"receivers\":[{\"external_key\":\"" + seq + "\",\"name\":\"" + user.getName() + "\",\"receiver_id\":\""+ user.getPhoneNumber() +"\"}],\"external_order_id\":\"도토리캐시\",\"template_order_name\":\"반반오리지날(한마리)\",\"fail_callback_url\":\"https://your-domain/fail\",\"success_callback_url\":\"https://your-domain/success\",\"template_token\":\""+token+"\"}";

        RequestBody templateSendRequestBody = RequestBody.create(requestBodyJson, mediaType);
        Request templateSendRequest = new Request.Builder()
                .url("https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template/order")
                .post(templateSendRequestBody)
                .addHeader("Accept", "application/json")
                .addHeader("Authorization", "KakaoAK " + KAKAO_GIFT_BIZ_REST_APP_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        Response templateSendRequestResponse = client.newCall(templateSendRequest).execute();

        dotoliService.updateKakaoGiftUser(seq, clientIpAddress);

        Thread.sleep(20000L);

        // 선물 상태 조회 요청
        Long reserveTraceId = 1L; // 선물 발송 요청에서 얻은 reserve_trace_id
        Request getCompleteOrderRequest = new Request.Builder()
                .url("https://gateway-giftbiz.kakao.com/openapi/giftbiz/v1/template/order/complete/status?reserve_trace_id=" + reserveTraceId)
                .get()
                .addHeader("Accept", "application/json")
                .addHeader("Authorization", "KakaoAK " + KAKAO_GIFT_BIZ_REST_APP_KEY)
                .build();

        Response getCompleteOrderResponse = client.newCall(getCompleteOrderRequest).execute();

        Map<String, Object> result = new HashMap<>();
        if (templateSendRequestResponse.isSuccessful() && getCompleteOrderResponse.isSuccessful()) {
            // 선물 발송 및 상태 조회 성공
            Map<String, Object> sendRequestResponse = objectMapper.readValue(templateSendRequestResponse.body().byteStream(), HashMap.class);
            Map<String, Object> completeOrderResponse = objectMapper.readValue(getCompleteOrderResponse.body().byteStream(), HashMap.class);
            result.put("sendRequestResponse", sendRequestResponse);
            result.put("completeOrderResponse", completeOrderResponse);
        } else {
            // API 호출 실패
            result.put("error", "API 호출 실패");
        }

        return result;
    }

    // 클라이언트의 공인 IP 주소 가져오는 메서드
    private String getClientIpAddress(HttpServletRequest request) {
        String clientIpAddress = request.getHeader("X-Forwarded-For");
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getHeader("Proxy-Client-IP");
        }
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (clientIpAddress == null || clientIpAddress.isEmpty() || "unknown".equalsIgnoreCase(clientIpAddress)) {
            clientIpAddress = request.getRemoteAddr();
        }
        return clientIpAddress;
    }
}