package com.example.demo.service;

import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.model.entity.Mission;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.User;
import com.example.demo.model.entity.User.UserBuilder;
import com.example.demo.model.form.UserBlockFormRequest;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.model.form.UserUpdateFormRequest;
import com.example.demo.repository.UserInterface;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInterface userRepository;

    public List<User> getAllUser() {
        return userRepository.findAllUserByDelYn("N");
    }

    public Optional<User> getUser(Integer userSeq) {
        return userRepository.findUserBySeqAndDelYn(userSeq, "N");
    }

    public Long getAllUserCount() {
        return userRepository.count();
    }

    public Long getTodayRegisterUserCount() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);

        return userRepository.countByCreateAtGreaterThanEqual(calendar.getTime());
    }

    public Long getBlockUserCount() {
        return userRepository.countByBlockYn("Y");
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public Optional<User> getUserBySocialKeyAndUserMail(String socialKey, String userMail){
        return userRepository.findBySocialKey(socialKey);
    }

    public DTO.JoinResponse Join(UserFormRequest form) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try{
            UserBuilder builder = User.builder();

            User user = builder.socialKey(form.getSocialKey())
                            .refreshToken(form.getRefreshToken())
                            .id(form.getId())
                            .password(form.getPassword())
                            .name(form.getName())
                            .nickname(form.getName())
                            .phoneNumber(form.getPhoneNumber())
                            .userMail(form.getEmail())
                            .dotoli(0)
                            .build();

            userRepository.save(user);

            joinResponse.setStatus("Success");
            return joinResponse;
        } catch (Exception e) {
            e.printStackTrace();
            joinResponse.setStatus("Fail");
            joinResponse.setMessage(e.getMessage());

            return joinResponse;
        }
    }

    public void updateRows(Map<Integer, UserUpdateFormRequest> form) {
        form.keySet().forEach(k -> {
            update(k, form.get(k));
        });
    }

    @Modifying(clearAutomatically = true)
    public void update(Integer id, UserUpdateFormRequest form) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
            
            user.setName(form.getName());
            user.setNickname(form.getNickname());
            user.setUserMail(form.getEmail());
            user.setPhoneNumber(form.getPhoneNumber());
            user.setSocialKey(form.getSocialKey());

            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void blockUser(UserBlockFormRequest request) {
        if (!request.getBlockList().isEmpty()) {
            userRepository.updateBlockStatus(request.getBlockList(), request.getBlockStatus());
        }
    }

    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
