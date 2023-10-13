package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.entity.CaptureMission;

public interface CaptureMissionInterface extends JpaRepository<CaptureMission, Long> {
    Optional<CaptureMission> findByMissionSeqAndDelYn(Integer missionSeq, String delYn);

    @Override
    @EntityGraph(attributePaths = {"user", "mission"})
    List<CaptureMission> findAll();
}
