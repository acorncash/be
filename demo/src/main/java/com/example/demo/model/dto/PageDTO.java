package com.example.demo.model.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PageDTO<T> {
    List<T> content;
    int startPage;
    int currentPage;
    int endPage;
    int size;
    boolean hasPrev;
    int prevIndex;
    boolean hasNext;
    int nextIndex;
    int totalPage;
}
