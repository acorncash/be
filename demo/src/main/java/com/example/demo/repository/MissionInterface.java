package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.Mission;

@Repository
public interface MissionInterface extends JpaRepository<Mission, Long>, JpaSpecificationExecutor<Mission> {
    List<Mission> findAlLMissionByDelYn(String delYn);

//    List<Mission> findByMissionTypeAndDelYn(String missionType, String delYn);

    Optional<Mission> findBySeqAndDelYn(Integer seq, String delYn);

    Page<Mission> findAll(Specification<Mission> spec, Pageable pageable);

    @Query("SELECT m FROM mission m WHERE m.missionType = :missionType AND m.delYn = :delYn AND NOW() BETWEEN m.startAt AND m.endAt AND m.limitCnt > m.attendCnt")
    List<Mission> findByMissionType(@Param("missionType") String missionType, @Param("delYn") String delYn);
}
