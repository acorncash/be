package com.example.demo.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.User;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;

@Repository
public interface UserInterface extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    List<User> findAllUserByDelYnAndBlockYn(String delYn, String blockYn);
    Page<User> findAll(Specification<User> spec, Pageable pageable);
    Optional<User> findUserBySeqAndDelYn(Integer Seq, String delYn);
    Long countByCreateAtGreaterThanEqual(Date currentDate);
    Long countByBlockYn(String blockYn);
    List<User> findByName(String name);

    Optional<User> findBySocialKey(String socialKey);
    Optional<User> findBySeqAndDelYn(Integer seq, @NotNull String delYn);
    Optional<User> findByUserMail(@NotNull String userMail);
    Optional<User> findOneById(String id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update user set blockYn = :status where seq in :seq")
    void updateBlockStatus(@Param("seq") Set<Integer> seqSet, @Param("status") String status);
}
