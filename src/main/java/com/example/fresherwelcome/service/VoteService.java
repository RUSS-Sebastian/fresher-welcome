package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.VoterVoteSummary;
import com.example.fresherwelcome.mapper.sortFieldMapper;
import com.example.fresherwelcome.model.Category;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.model.Volunteer;
import com.example.fresherwelcome.model.Vote;
import com.example.fresherwelcome.repository.CandidateRepo;
import com.example.fresherwelcome.repository.UserRepo;
import com.example.fresherwelcome.repository.VoteRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VoteService {

    private final VoteRepo voteRepo;
    private final CandidateRepo candidateRepo;
    private final UserRepo userRepo;
    private final UserService userService;

    public VoteService(VoteRepo voteRepo, CandidateRepo candidateRepo, UserRepo userRepo,UserService userService) {
        this.voteRepo = voteRepo;
        this.candidateRepo = candidateRepo;
        this.userRepo = userRepo;
        this.userService = userService;
    }

    public void castVote(Long userId, Long candidateId, Category category) {
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var candidate = candidateRepo.findById(candidateId)
                .orElseThrow(() -> new IllegalArgumentException("Candidate not found"));

        if (candidate.getCategory() != category) {
            throw new IllegalArgumentException("Candidate category mismatch");
        }

        // Check if user has already voted in this category
        Optional<Vote> existingVote = voteRepo.findByUser_IdAndCategory(userId, category);
        if (existingVote.isPresent()) {
            throw new IllegalArgumentException("You have already voted for " + category);
        }

        // Save the vote
        Vote vote = new Vote();
        vote.setUser(user);
        vote.setCandidate(candidate);
        vote.setCategory(category);
        vote.setVotedAt(LocalDateTime.now());

        voteRepo.save(vote);
    }

    public Map<String, Long> getUserVotes(Long userId) {
        // Get the user or throw if not found
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Map<String, Long> votesMap = new HashMap<>();
        List<Vote> votes = voteRepo.findByUser_Id(user.getId());

        for (Vote v : votes) {
            votesMap.put(v.getCategory().name().toLowerCase(), v.getCandidate().getCandidateId());
        }

        return votesMap;
    }

    public Page<VoterVoteSummary> getAllVoterSummaries(int page, int size, String sortBy, String direction) {
        sortBy = sortFieldMapper.mapVote(sortBy);
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return userRepo.getAllVoterSummaries(pageable);
    }
}

