package com.example.demo.repository;

import com.example.demo.model.entity.Dotoli;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DotoliInterface extends JpaRepository<Dotoli, Long> {
    @Override
    @EntityGraph(attributePaths = {"user", "mission"})
    List<Dotoli> findAll();

    List<Dotoli> findByUserSeq(Integer userSeq);

    List<Dotoli> findByMissionSeqAndIpAddress(Integer missionSeq, String ipAddress);

    @Query("SELECT d FROM dotoli d WHERE d.userSeq = :userSeq AND d.missionSeq = :missionSeq " +
            "AND (DATE(NOW()) = DATE(d.createAt)) " +
            "AND ((TIME(NOW()) >= '12:00:00' AND TIME(d.createAt) >= '12:00:00') " +
            "OR (TIME(NOW()) < '12:00:00' AND TIME(d.createAt) < '12:00:00')) " +
            "ORDER BY d.createAt DESC")
    Optional<Dotoli> findTopByUserSeqAndMissionSeqOrderByCreatAtAsc(@Param("userSeq") Integer userSeq, @Param("missionSeq") Integer missionSeq);


    @Query("SELECT COUNT(d) FROM dotoli d WHERE d.userSeq = :userSeq AND d.missionTitle = '출석 체크 보상' AND DATE(d.createAt) = CURRENT_DATE")
    Optional<Integer> getCountOfAttendanceCheck(@Param("userSeq") Integer userSeq);

    Optional<Dotoli> findBySignedValue(String signedValue);
}
