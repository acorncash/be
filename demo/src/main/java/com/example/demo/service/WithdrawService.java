package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Withdraw;
import com.example.demo.repository.WithdrawRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WithdrawService {
    private final WithdrawRepository withdrawRepository;

    public List<Withdraw> getAll() {
        return withdrawRepository.findAll();
    }
}
