package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.dto.VoterVoteSummary;
import com.example.fresherwelcome.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // Optional: find user by email
    Optional<User> findByEmail(String email);

    // Optional: find user by TNT
    Optional<User> findByTnt(String tnt);

    Optional<User> findByName(String name);

    @Query(
            value = """
        SELECT new com.example.fresherwelcome.dto.VoterVoteSummary(
            u.tnt,
            MAX(CASE WHEN v.category = com.example.fresherwelcome.model.Category.KING THEN c.name END),
            MAX(CASE WHEN v.category = com.example.fresherwelcome.model.Category.QUEEN THEN c.name END)
        )
        FROM Vote v
        JOIN v.user u
        JOIN v.candidate c
        GROUP BY u.id, u.tnt
        ORDER BY u.tnt DESC
    """,
            countQuery = """
        SELECT COUNT(DISTINCT v.user)
        FROM Vote v
    """
    )
    Page<VoterVoteSummary> getAllVoterSummaries(Pageable pageable);



}
