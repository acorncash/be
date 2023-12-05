package com.example.demo.repository;

import com.example.demo.model.entity.Withdraw;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WithdrawInterface extends JpaRepository<Withdraw, Integer> {
    Long countByWithdrawYn(String withdrawYn);

    List<Withdraw> findByUserSeq(Integer userSeq);

    @Override
    @EntityGraph(attributePaths = {"user"})
    List<Withdraw> findAll();
}
