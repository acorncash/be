package com.example.demo.model.spec;

import org.springframework.data.jpa.domain.Specification;

import com.example.demo.model.entity.User;


public class UserSpec {
    public static Specification<User> equalBlockYn(String blockYn) {
        return (root, query, builder) -> {
            return builder.equal(root.get("blockYn"), blockYn);
        };
    }

    public static Specification<User> equalDelYN(String delYN) {
        return (root, query, builder) -> {
            return builder.equal(root.get("delYn"), delYN);
        };
    }

    public static Specification<User> search(String type, String content) {
        content = "%" + content + "%";
        if ("name".equals(type)) {
            return likeName(content);
        } else if("nickname".equals(type)) {
            return likeNickname(content);
        } else if("phoneNumber".equals(type)) {
            return likePhoneNumber(content);
        } else if("email".equals(type)) {
            return likeUserName(content);
        } else {
            return (root, query, builder) -> {
                return builder.conjunction();
            };
        }
    }

    public static Specification<User> likeName(String name) {
        return (root, query, builder) -> {
            return builder.like(root.get("name"), name);
        };
    }

    public static Specification<User> likeNickname(String nickname) {
        return (root, query, builder) -> {
            return builder.like(root.get("nickname"), nickname);
        };
    }

    public static Specification<User> likePhoneNumber(String phoneNumber) {
        return (root, query, builder) -> {
            return builder.like(root.get("phoneNumber"), phoneNumber);
        };
    }

    public static Specification<User> likeUserName(String userMail) {
        return (root, query, builder) -> {
            return builder.like(root.get("userMail"), userMail);
        };
    }
}
