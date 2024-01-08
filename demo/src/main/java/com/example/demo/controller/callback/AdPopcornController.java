package com.example.demo.controller.callback;

import com.example.demo.model.form.AdPopcornFormRequest;
import com.example.demo.service.AdPopcornService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/callback/adPopcorn")
public class AdPopcornController {
    private final AdPopcornService adPopcornService;

    @Autowired
    public AdPopcornController(AdPopcornService adPopcornService) {
        this.adPopcornService = adPopcornService;
    }

    @PostMapping("adPopcornCallBack")
    public ResponseEntity<String> adPopcornCallBack(@ModelAttribute AdPopcornFormRequest requestDTO, HttpServletRequest request) {
        String rewardIsSuccessfullyProcessed = adPopcornService.processAdPopcornCallback(
                requestDTO.getUsn(),
                requestDTO.getReward_key(),
                requestDTO.getSigned_value(),
                requestDTO.getCampaign_key(),
                requestDTO.getQuantity(),
                request.getRemoteAddr()
        );
        return ResponseEntity.ok(rewardIsSuccessfullyProcessed);
    }

    @PostMapping("adPopcornCallBackIphone")
    public ResponseEntity<String> adPopcornCallBackIphone(@ModelAttribute AdPopcornFormRequest requestDTO, HttpServletRequest request) {
        String rewardIsSuccessfullyProcessed = adPopcornService.processAdPopcornCallbackIphone(
                requestDTO.getUsn(),
                requestDTO.getReward_key(),
                requestDTO.getSigned_value(),
                requestDTO.getCampaign_key(),
                requestDTO.getQuantity(),
                request.getRemoteAddr()
        );
        return ResponseEntity.ok(rewardIsSuccessfullyProcessed);
    }
}