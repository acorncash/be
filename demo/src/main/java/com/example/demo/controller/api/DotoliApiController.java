package com.example.demo.controller.api;

import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Withdraw;
import com.example.demo.service.DotoliService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("dotoliByUser/{userSeq}")
    public List<Dotoli> getDotoliByUser(@PathVariable Integer userSeq) {
        return dotoliService.getDotoliByUser(userSeq);
    }
}
