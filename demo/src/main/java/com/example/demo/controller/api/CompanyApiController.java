package com.example.demo.controller.api;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Company;
import com.example.demo.model.form.CompanyFormRequest;
import com.example.demo.model.form.CompanyAddFormRequest;
import com.example.demo.model.form.CompanyUpdateFormRequest;
import com.example.demo.model.form.CompanyFormRequest;
import com.example.demo.service.CaptureMissionService;
import com.example.demo.service.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyApiController {
    private final CompanyService companyService;

    @GetMapping("")
    public List<Company> getCompanyAll() {
        return companyService.getCompanyAll();
    }

    @PutMapping("rows")
    public void updateRows(@Valid @RequestBody Map<Long, CompanyAddFormRequest> formRequest) {
        companyService.updateRows(formRequest);
    }

}
