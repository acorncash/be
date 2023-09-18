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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInterface userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getUserBySocialKeyAndUserMail(String socialKey, String userMail){
        return userRepository.findBySocialKeyAndUserMail(socialKey, userMail);
    }

    public DTO.JoinResponse Join(UserFormRequest request) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try{
            List<User> duplicateUserName = userRepository.findByName(request.getName());

            System.out.println(duplicateUserName);

            if (duplicateUserName.isEmpty()) {
                UserBuilder builder = User.builder();

                User user = builder.name(request.getName())
                                .nickname(request.getNickName())
                                .phoneNumber(request.getPhoneNumber())
                                .userMail(request.getEmail())
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
}
