package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.entity.Withdraw;
import com.example.demo.model.form.WithdrawFromRequest;
import com.example.demo.service.MissionService;
import com.example.demo.service.WithdrawService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/withdraw")
public class WithdrawApiController {
    private final WithdrawService withdrawService;

    @GetMapping("")
    public List<Withdraw> getWithdrawAll() {
        return withdrawService.getWithdrawAll();
    }

    @GetMapping("{withdrawSeq}")
    public Optional<Withdraw> getWithdraw(@PathVariable Integer withdrawSeq) {
        return withdrawService.getWithdrawByWithdrawSeq(withdrawSeq);
    }

    @PostMapping("addWithdraw")
    public DTO.Response addWithdraw(@Valid @RequestBody WithdrawFromRequest formRequest, HttpServletRequest request) {
        System.out.println(formRequest.getUserSeq());
        System.out.println(formRequest.getDotoli());
        System.out.println(formRequest.getBankAccountNumber());
        System.out.println(formRequest.getBankAccountName());
        return withdrawService.addWithdraw(formRequest, request.getRemoteAddr());
    }
}
