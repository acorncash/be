package com.example.demo.service;

import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Dotoli.DotoliBuilder;
import com.example.demo.model.entity.User;
import com.example.demo.repository.DotoliInterface;
import com.example.demo.repository.UserInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdPopcornService {

    private final UserInterface userRepository;
    private final DotoliInterface dotoliRepository;

    Base64.Encoder encoder = Base64.getEncoder();

    public String processAdPopcornCallback(Integer userSeq, String reward_key, String signedValue, String campaignKey, Integer quantity, String ipAddress) {
        try {
            String hmacMd5 = this.calculateHMACMD5(userSeq + reward_key + quantity + campaignKey, "ef5e7cf09c954d95");

            // signedValue와 변환한 HMAC-MD5 값을 비교
            if (!signedValue.equals(hmacMd5)) {
                return "{\"Result\":false,\"ResultCode\":1100,\"ResultMsg\":\"invalid signed value\"}";
            }

            Optional<Dotoli> existingDotoli = dotoliRepository.findBySignedValue(signedValue);
            if (existingDotoli.isPresent()) {
                return "{\"Result\":false,\"ResultCode\":3100,\"ResultMsg\":\"duplicate transaction\"}";
            }

            Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
            User user;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            } else {
                // 선택된 유저가 없을 때 2를 반환하는 로직
                return "{\"Result\":false,\"ResultCode\":3200,\"ResultMsg\":\"invalid user\"}";
            }

            DotoliBuilder builder = Dotoli.builder();
            Dotoli dotoli = builder.userSeq(userSeq)
                    .missionTitle("제휴 보상")
                    .missionDotoli(quantity)
                    .userDotoli(user.getDotoli())
                    .afterDotoli(user.getDotoli() + quantity)
                    .ipAddress(ipAddress)
                    .signedValue(signedValue)
                    .build();

            dotoliRepository.save(dotoli);

            user.setDotoli(dotoli.getAfterDotoli());
            userRepository.save(user);

            return "{\"Result\":true,\"ResultCode\":1,\"ResultMsg\":\"success\"}";
        } catch (Exception e) {
            return "{\"Result\":false,\"ResultCode\":4000,\"ResultMsg\":\"custom error message\"}";
        }
    }

    public String processAdPopcornCallbackIphone(Integer userSeq, String reward_key, String signedValue, String campaignKey, Integer quantity, String ipAddress) {
        try {
            String hmacMd5 = this.calculateHMACMD5(userSeq + reward_key + quantity + campaignKey, "9242095fbd53416d");

            // signedValue와 변환한 HMAC-MD5 값을 비교
            if (!signedValue.equals(hmacMd5)) {
                return "{\"Result\":false,\"ResultCode\":1100,\"ResultMsg\":\"invalid signed value\"}";
            }

            Optional<Dotoli> existingDotoli = dotoliRepository.findBySignedValue(signedValue);
            if (existingDotoli.isPresent()) {
                return "{\"Result\":false,\"ResultCode\":3100,\"ResultMsg\":\"duplicate transaction\"}";
            }

            Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
            User user;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            } else {
                // 선택된 유저가 없을 때 2를 반환하는 로직
                return "{\"Result\":false,\"ResultCode\":3200,\"ResultMsg\":\"invalid user\"}";
            }

            DotoliBuilder builder = Dotoli.builder();
            Dotoli dotoli = builder.userSeq(userSeq)
                    .missionTitle("제휴 보상")
                    .missionDotoli(quantity)
                    .userDotoli(user.getDotoli())
                    .afterDotoli(user.getDotoli() + quantity)
                    .ipAddress(ipAddress)
                    .signedValue(signedValue)
                    .build();

            dotoliRepository.save(dotoli);

            user.setDotoli(dotoli.getAfterDotoli());
            userRepository.save(user);

            return "{\"Result\":true,\"ResultCode\":1,\"ResultMsg\":\"success\"}";
        } catch (Exception e) {
            return "{\"Result\":false,\"ResultCode\":4000,\"ResultMsg\":\"custom error message\"}";
        }
    }

    public static String calculateHMACMD5(String plaintext, String secretKey) throws NoSuchAlgorithmException, InvalidKeyException {
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "HmacMD5");
        Mac mac = Mac.getInstance("HmacMD5");
        mac.init(keySpec);
        byte[] result = mac.doFinal(plaintext.getBytes());
        return bytesToHex(result); // HMAC-MD5 결과를 16진수 문자열로 변환하여 반환
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
