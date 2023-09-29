package com.example.demo.repository;

import com.example.demo.model.entity.User;
import com.example.demo.model.entity.Withdraw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawInterface extends JpaRepository<Withdraw, Integer> {
}
