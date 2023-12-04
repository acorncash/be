package com.example.demo.repository;

import com.example.demo.model.entity.Notice;
import com.example.demo.model.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendInterface extends JpaRepository<Recommend, Integer> {
}
