package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.Notice;
import com.example.demo.model.form.NoticeFormRequest;
import com.example.demo.repository.NoticeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoticeService {
    private final NoticeRepository noticeReository;

    public List<Notice> getAll() {
        return noticeReository.findAll();
    }

    public Notice findById(Integer seq) {
        return noticeReository.findById(seq).orElseThrow(() -> new EntityNotFoundException("게시글을 찾을 수 없습니다."));
    }

    public void post(NoticeFormRequest form) {
        Notice notice = Notice.builder()
                .title(form.getTitle())
                .content(form.getContent())
                .postFrom(form.getPostFrom())
                .postTo(form.getPostTo())
                .status("1") //status 정의 필요
                .topStatus(form.getTopStatus())
                .userSeq(102) //로그인 한 userSeq 받아오는 로직 구현 필요
                .build();

        noticeReository.save(notice);
    }

    public void update(Integer seq, NoticeFormRequest form) {
        noticeReository.findById(seq).ifPresent(notice -> {
            notice.setPostFrom(form.getPostFrom());
            notice.setPostTo(form.getPostTo());
            notice.setTopStatus(form.getTopStatus());
            notice.setTitle(form.getTitle());
            notice.setContent(form.getContent());
            
            noticeReository.save(notice);
        });
    }

    public void deleteById(Integer seq) {
        noticeReository.deleteById(seq);
    }
}
