package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Notice;
import com.example.demo.model.form.NoticeFormRequest;
import com.example.demo.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoticeService {
    private final NoticeRepository noticeReository;

    public List<Notice> getAll() {
        return noticeReository.findAll();
    }

    public void post(NoticeFormRequest form) {
        Notice notice = Notice.builder()
                .title(form.getTitle())
                .content(form.getContent())
                .postFrom(form.getPostFrom())
                .postTo(form.getPostTo())
                .status(form.getStatus())
                .topStatus(form.getTopStatus())
                .userSeq(102) //로그인 한 userSeq 받아오는 로직 구현 필요
                .build();

        noticeReository.save(notice);
    }
}
