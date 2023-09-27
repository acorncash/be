package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Notice;
import com.example.demo.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoticeService {
    private final NoticeRepository noticeReository;

    public List<Notice> getAll() {
        return noticeReository.findAll();
    }
}
