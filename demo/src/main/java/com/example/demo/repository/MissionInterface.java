package com.example.demo.repository;

import com.example.demo.model.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionInterface extends JpaRepository<Mission, Long> {
    List<Mission> findByMissionType(String missionType);
}
