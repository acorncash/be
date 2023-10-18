package com.example.demo.controller.api;

import java.io.IOException;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.form.NoticeFormRequest;
import com.example.demo.service.NoticeService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/config")
public class ConfigApiController {
    private final NoticeService noticeService;

    @PostMapping("new")
    public void post(NoticeFormRequest request, HttpServletResponse response) throws IOException {
        noticeService.post(request);

        response.sendRedirect("/config/notice");
    }

    @PutMapping("{seq}")
    public void update(@PathVariable Integer seq, NoticeFormRequest request, HttpServletResponse response) throws IOException {
        noticeService.update(seq, request);

        response.sendRedirect("/config/notice");
    }

    @DeleteMapping("{seq}")
    public void delete(@PathVariable Integer seq) {
        noticeService.deleteById(seq);
    }
}
