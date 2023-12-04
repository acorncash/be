package com.example.demo.repository;

import com.example.demo.model.entity.Dotoli;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.entity.Mission;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DotoliInterface extends JpaRepository<Dotoli, Long> {
    @Override
    @EntityGraph(attributePaths = {"user", "mission"})
    List<Dotoli> findAll();

    List<Dotoli> findByUserSeq(Integer userSeq);

    List<Dotoli> findByMissionSeqAndIpAddress(Integer missionSeq, String ipAddress);

    @Query(" SELECT d FROM dotoli d WHERE d.userSeq = :userSeq AND d.missionSeq = :missionSeq AND SUBDATE(d.createAt, -:resetCnt) >= date_format(NOW(), '%Y-%m-%d') ORDER BY d.createAt DESC LIMIT 1 ")
    Optional<Dotoli> findTopByUserSeqAndMissionSeqOrderByCreatAtAsc(@Param("userSeq") Integer userSeq, @Param("missionSeq") Integer missionSeq, @Param("resetCnt") Integer resetCnt);

    @Query("SELECT COUNT(d) FROM dotoli d WHERE d.userSeq = :userSeq AND d.missionTitle = '출석 체크 보상' AND DATE(d.createAt) = CURRENT_DATE")
    Optional<Integer> getCountOfAttendanceCheck(@Param("userSeq") Integer userSeq);

}
