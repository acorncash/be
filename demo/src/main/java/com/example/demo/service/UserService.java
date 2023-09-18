package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.User;
import com.example.demo.model.entity.User.UserBuilder;
import com.example.demo.model.form.UserFormRequest;
import com.example.demo.repository.UserInterface;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInterface userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public Optional<User> getUserBySocialKeyAndUserMail(String socialKey, String userMail){
        return userRepository.findBySocialKeyAndUserMail(socialKey, userMail);
    }

    public DTO.JoinResponse Join(UserFormRequest form) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try{
            List<User> duplicateUserName = userRepository.findByName(form.getName());

            System.out.println(duplicateUserName);

            if (duplicateUserName.isEmpty()) {
                UserBuilder builder = User.builder();

                User user = builder.name(form.getName())
                                .nickname(form.getNickname())
                                .phoneNumber(form.getPhoneNumber())
                                .userMail(form.getEmail())
                                .dotoli(0)
                                .createDate(new Date())
                                .updateDate(new Date())
                                .delYN("N")
                                .build();

                userRepository.save(user);
            }
            else{
                throw new IllegalStateException("중복된 이름 입니다.");
            }

            joinResponse.setStatus("Success");
            return joinResponse;
        } catch (Exception e) {
            e.printStackTrace();
            joinResponse.setStatus("Fail");
            joinResponse.setMessage(e.getMessage());

            return joinResponse;
        }
    }

    public void update(Long id, UserFormRequest form) {
        try {
            Optional<User> userOptional = userRepository.findById(id);

            userOptional.ifPresent(user -> {
                user.setName(form.getName());
                user.setNickname(form.getNickname());
                user.setUserMail(form.getEmail());
                user.setPhoneNumber(form.getPhoneNumber());

                userRepository.save(user);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
