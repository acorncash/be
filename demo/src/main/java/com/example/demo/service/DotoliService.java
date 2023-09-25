package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Dotoli;
import com.example.demo.repository.DotoliInterface;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DotoliService {
    private final DotoliInterface repository;

    public List<Dotoli> getAll() {
        List<Dotoli> list = repository.findAll();

        return list;
    }
}
