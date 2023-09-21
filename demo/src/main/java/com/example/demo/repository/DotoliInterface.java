package com.example.demo.repository;

import com.example.demo.model.entity.Dotoli;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotoliInterface extends JpaRepository<Dotoli, Long> {
}
