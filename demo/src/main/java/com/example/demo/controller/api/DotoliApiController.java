package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.service.DotoliService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dotoli")
public class DotoliApiController {
    private final DotoliService dotoliService;

    @GetMapping("")
    public List<Dotoli> getDotoliAll() {
        return dotoliService.getDotoliAll();
    }

    @GetMapping("{dotoliSeq}")
    public Optional<Dotoli> getDotoli(@PathVariable Integer dotoliSeq) {
        return dotoliService.getDotoli(dotoliSeq);
    }

    @PostMapping("attendanceCheck/{userSeq}")
    public DTO.Response attendanceCheck (@PathVariable Integer userSeq, HttpServletRequest request) {
        return dotoliService.insertAttendanceCheck(userSeq, request.getRemoteAddr());
    }
}
