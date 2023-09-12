package com.example.demo.DTO;

import com.example.demo.Entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.*;

public class DTO {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter @Setter
    @Builder
    @ToString
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
