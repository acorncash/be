package com.example.demo.model.form;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CaptureMissionFormRequest {
    private Integer MissionSeq;
    private Integer UserSeq;
    private MultipartFile Image;
}
