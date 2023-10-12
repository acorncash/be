package com.example.demo.repository;

import com.example.demo.DTO.DTO;
import com.example.demo.model.form.WithdrawFromRequest;
import com.example.demo.service.MissionService;
import com.example.demo.service.WithdrawService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
//@Transactional
public class WithdrawApiControllerTest {

    @Autowired
    private WithdrawService withdrawService;

    @Test
    void addWithdraw(){
        WithdrawFromRequest fromRequest = new WithdrawFromRequest();
        DTO.Response response;

        fromRequest.setUserSeq(809);
        fromRequest.setDotoli(1000);
        fromRequest.setBankAccountName("농협");
        fromRequest.setBankAccountNumber("02024806798639");

        response = withdrawService.addWithdraw(fromRequest, "0.0.0.0.0.0.1");
        System.out.println("Status : " + response.getStatus());
        System.out.println("Message : " + response.getMessage());
    }
}
