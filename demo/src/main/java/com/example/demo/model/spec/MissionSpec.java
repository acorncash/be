package com.example.demo.model.spec;

import org.springframework.data.jpa.domain.Specification;

import com.example.demo.model.entity.Mission;

public class MissionSpec {
    public static Specification<Mission> equalMissionType(String missionType) {
        return (root, query, builder) -> {
            return builder.equal(root.get("missionType"), missionType);
        };
    }

    public static Specification<Mission> equalDelYN(String delYN) {
        return (root, query, builder) -> {

            return builder.equal(root.get("delYn"), delYN);
        };
    }

    public static Specification<Mission> search(String type, String content) {
        content = "%" + content + "%";
        if ("all".equals(type)) {
            return likeAll(content);
        } else if("title".equals(type)) {
            return likeTitle(content);
        } else if("description".equals(type)) {
            return likeDescription(content);
        } else if("keyword".equals(type)) {
            return likeKeyword(content);
        } else {
            return (root, query, builder) -> {
                return builder.conjunction();
            };
        }
    }

    public static Specification<Mission> likeAll(String content) {
        return (root, query, builder) -> {
            return builder.or(builder.like(root.get("title"), content),
                    builder.like(root.get("description"), content),
                    builder.like(root.get("keyword"), content));
        };
    }

    public static Specification<Mission> likeTitle(String title) {
        return (root, query, builder) -> {
            return builder.like(root.get("title"), title);
        };
    }

    public static Specification<Mission> likeDescription(String description) {
        return (root, query, builder) -> {
            return builder.like(root.get("description"), description);
        };
    }

    public static Specification<Mission> likeKeyword(String keyword) {
        return (root, query, builder) -> {
            return builder.like(root.get("keyword"), keyword);
        };
    }
}
