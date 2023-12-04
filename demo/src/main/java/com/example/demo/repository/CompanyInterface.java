package com.example.demo.repository;

import com.example.demo.model.entity.Company;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.entity.Withdraw;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CompanyInterface extends JpaRepository<Company, Integer> {
    @Override
    List<Company> findAll();

}
