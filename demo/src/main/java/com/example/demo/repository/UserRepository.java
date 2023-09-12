package com.example.demo.repository;

import com.example.demo.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Component
@RequiredArgsConstructor
public abstract class UserRepository implements UserInterface {
}
