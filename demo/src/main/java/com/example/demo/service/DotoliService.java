package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.entity.Mission;
import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Dotoli;
import com.example.demo.repository.DotoliInterface;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DotoliService {
    private final DotoliInterface dotoliRepository;

    public List<Dotoli> getDotoliAll() {
        return dotoliRepository.findAll();
    }

    public Optional<Dotoli> getDotoli(Integer dotoliSeq) {
        return dotoliRepository.findById(Long.valueOf(dotoliSeq));
    }

    public List<Dotoli> getDotoliByUser(Integer userSeq) {
        return dotoliRepository.findByUserSeq(userSeq);
    }
}
