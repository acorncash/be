package com.example.demo.model.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;

@Getter
public class PageDTO<T> {
    public PageDTO(Page<T> page) {
        this.content = page.getContent();
        this.startPage = page.getNumber() - 5 > 0 ? page.getNumber() - 5 : 0;
        this.currentPage = page.getNumber();
        this.endPage = page.getNumber() + 5 < page.getTotalPages() ? page.getNumber() + 5 : page.getTotalPages() - 1;
        this.size = page.getSize();
        this.hasPrev = page.hasPrevious();
        this.prevIndex = page.previousOrFirstPageable().getPageNumber();
        this.hasNext = page.hasNext();
        this.nextIndex = page.nextOrLastPageable().getPageNumber();
        this.totalPage = page.getTotalPages();
    }

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
