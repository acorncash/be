package com.example.demo.DTO;

import com.example.demo.model.entity.User;

import jakarta.validation.constraints.NotNull;
import lombok.*;

public class DTO {
    @Data
    public static class JoinRequest {
        @NotNull
        private String name;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter @Setter
    @Builder
    public static class JoinResponse {
        private String status;
        private String message;
        private User userDate;
    }
}
