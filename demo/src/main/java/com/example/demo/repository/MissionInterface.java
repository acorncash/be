package com.example.demo.repository;

import com.example.demo.model.entity.Mission;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MissionInterface extends JpaRepository<Mission, Long> {
    List<Mission> findAlLMissionByDelYn(String delYn);
    List<Mission> findByMissionTypeAndDelYn(String missionType, String delYn);
    Optional<Mission> findBySeqAndDelYn(Integer seq, String delYn);
}
