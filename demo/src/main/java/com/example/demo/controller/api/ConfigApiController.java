package com.example.demo.controller.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.form.NoticeFormRequest;
import com.example.demo.service.NoticeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/config")
public class ConfigApiController {
    private final NoticeService noticeService;

    @PostMapping()
    public void post(@RequestBody NoticeFormRequest request) {
        noticeService.post(request);
    }
}
