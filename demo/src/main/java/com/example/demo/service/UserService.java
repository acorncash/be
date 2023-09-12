package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.Entity.User;
import com.example.demo.repository.UserInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class UserService {
    private final UserInterface userRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getUserBySocialKeyAndUserMail(String socialKey, String userMail){
        return userRepository.findBySocialKeyAndUserMail(socialKey, userMail);
    }

    public DTO.JoinResponse Join(DTO.JoinRequest joinRequest) {
        DTO.JoinResponse joinResponse = new DTO.JoinResponse();
        try{
            List<User> duplicateUserName = userRepository.findByName(joinRequest.getName());

            System.out.println(duplicateUserName);

            if (duplicateUserName.isEmpty()){
                User user = new User();

                user.setName(joinRequest.getName());
                user.setDotoli(0);
                user.setCreateDate(new Date());
                user.setUpdateDate(new Date());
                user.setDelYN("N");
                userRepository.save(user);
            }
            else{
                throw new IllegalStateException("중복된 이름 입니다.");
            }

            joinResponse.setStatus("Success");
            return joinResponse;
        } catch (Exception e) {
            joinResponse.setStatus("Fail");
            joinResponse.setMessage(e.getMessage());

            return joinResponse;
        }
    }
}
