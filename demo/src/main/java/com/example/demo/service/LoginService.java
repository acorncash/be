package com.example.demo.service;

import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.entity.User;
import com.example.demo.model.enums.Role;
import com.example.demo.repository.UserInterface;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {
    private final UserInterface userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findOneById(id);

        if (userOptional.isEmpty()) {
                throw new UsernameNotFoundException("사용자 정보를 찾을 수 없습니다.");
        }
        User user = userOptional.get();

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getId())
            .password(user.getPassword())
            .authorities(new SimpleGrantedAuthority(Role.ROLE_ADMIN.getCode()))
            .build();
    }
}
