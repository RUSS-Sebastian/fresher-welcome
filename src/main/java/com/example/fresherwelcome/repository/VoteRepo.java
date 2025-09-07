package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.dto.VoterVoteSummary;
import com.example.fresherwelcome.model.Category;
import com.example.fresherwelcome.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VoteRepo extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUser_IdAndCategory(Long userId, Category category);

    List<Vote> findByUser_Id(Long id);


}