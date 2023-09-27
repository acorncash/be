package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    @Override
    @EntityGraph(attributePaths = {"user"})
    List<Notice> findAll();
}
