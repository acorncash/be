package com.example.demo.service;

import com.example.demo.model.entity.Company;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.form.CompanyAddFormRequest;
import com.example.demo.model.form.MissionAddFormRequest;
import com.example.demo.repository.CompanyInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyInterface companyRepository;
    public List<Company> getCompanyAll() {
        return companyRepository.findAll();
    }

    public void updateRows(Map<Long, CompanyAddFormRequest> form) {
        form.keySet().forEach(k -> {
            Optional<Company> missOptional = companyRepository.findById(k.intValue());
            if (missOptional.isPresent())
                update(missOptional.get(), form.get(k));
            else
                createCompany(form.get(k));
        });
    }

    public void createCompany(CompanyAddFormRequest form) {
        Company company = Company.builder()
                .name(form.getName())
                .mall(form.getMall())
                .build();

        companyRepository.save(company);
    }

    @Modifying(clearAutomatically = true)
    public void update(Company company, CompanyAddFormRequest form) {
        try {
            company.setName(form.getName());
            company.setMall(form.getMall());

            companyRepository.save(company);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
