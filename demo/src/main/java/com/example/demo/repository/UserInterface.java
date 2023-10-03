package com.example.demo.repository;

import com.example.demo.model.entity.Mission;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.User;

import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserInterface extends JpaRepository<User, Integer> {

    List<User> findAllUserByDelYn(String delYn);
    Optional<User> findUserBySeqAndDelYn(Integer Seq, String delYn);
    Long countByCreateAtGreaterThanEqual(Date currentDate);
    Long countByBlockYn(String blockYn);
    List<User> findByName(String name);

    Optional<User> findBySocialKey(String socialKey);
    Optional<User> findBySeqAndDelYn(Integer seq, @NotNull String delYn);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update user set blockYn = :status where seq in :seq")
    void updateBlockStatus(@Param("seq") Set<Integer> seqSet, @Param("status") String status);
}
