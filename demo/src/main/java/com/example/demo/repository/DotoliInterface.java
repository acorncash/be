package com.example.demo.repository;

import com.example.demo.model.entity.Dotoli;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotoliInterface extends JpaRepository<Dotoli, Long> {
    @Override
    @EntityGraph(attributePaths = {"user", "mission"})
    List<Dotoli> findAll();
}
