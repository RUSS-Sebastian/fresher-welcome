package com.example.fresherwelcome.dto;

import com.example.fresherwelcome.model.Category;

public class VoteRequestDto {
    private Long candidateId;
    private Category category;

    public VoteRequestDto() {
    }

    // Getters and Setters
    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
