package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.dto.CandidateVoteSummary;
import com.example.fresherwelcome.model.Candidate;
import com.example.fresherwelcome.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {

    List<Candidate> findByCategory(Category category);

    @Query("SELECT c.id AS candidateId, c.name AS name, COUNT(v.id) AS voteCount " +
            "FROM Candidate c LEFT JOIN Vote v ON v.candidate = c " +
            "WHERE c.category = :category " +
            "GROUP BY c.id, c.name " +
            "ORDER BY voteCount DESC")
    List<CandidateVoteSummary> getCandidatesWithVoteCount(@Param("category") Category category);
}
