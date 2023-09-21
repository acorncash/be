package com.example.demo.repository;

import com.example.demo.model.entity.CaptureMission;
import com.example.demo.model.entity.Mission;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CaptureMissionInterface extends JpaRepository<CaptureMission, Long> {
    Optional<CaptureMission> findByMissionSeqAndDelYn(Integer missionSeq, String delYn);
}
