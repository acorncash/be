package com.example.demo.controller.api;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.form.NoticeFormRequest;
import com.example.demo.service.NoticeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://14.7.33.34:8080")
@RequestMapping("/api/config")
public class ConfigApiController {
    private final NoticeService noticeService;

    @PostMapping()
    public void post(@RequestBody NoticeFormRequest request) {
        noticeService.post(request);
    }
}
