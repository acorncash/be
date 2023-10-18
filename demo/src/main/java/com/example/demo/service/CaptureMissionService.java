package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.entity.CaptureMission;
import com.example.demo.repository.CaptureMissionInterface;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CaptureMissionService {
    private final CaptureMissionInterface captureMissionRepository;

    public List<CaptureMission> getAll() {
        return captureMissionRepository.findAll();
    }

    public void confirmMission(Long seq, String confirmYn) {
        captureMissionRepository.findById(seq).ifPresent(cpatureMission -> {
            cpatureMission.setConfirmYn(confirmYn);
            
            if ("Y".equals(confirmYn)) 
                cpatureMission.setConfirmAt(new Date(System.currentTimeMillis()));

            captureMissionRepository.save(cpatureMission);
        });
    }
}
