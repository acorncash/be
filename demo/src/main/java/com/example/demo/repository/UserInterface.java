package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInterface extends JpaRepository<User, Long> {
    List<User> findByName(String name);

    Optional<User> findBySocialKeyAndUserMail(String socialKey, String userMail);
}
