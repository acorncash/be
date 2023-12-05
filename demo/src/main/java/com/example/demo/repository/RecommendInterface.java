package com.example.demo.repository;

import com.example.demo.model.entity.Notice;
import com.example.demo.model.entity.Recommend;
import com.example.demo.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendInterface extends JpaRepository<Recommend, Integer> {
    Recommend findRecommendByUserSeqAndRecommendUserSeq(Integer userSeq, Integer recommendUserSeq);

    List<Recommend> findRecommendByRecommendUserSeq(Integer recommendUserSeq);
}
