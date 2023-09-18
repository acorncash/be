package com.example.demo.repository;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public abstract class UserRepository implements UserInterface {
}
