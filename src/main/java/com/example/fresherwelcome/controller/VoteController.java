package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.VoteRequestDto;
import com.example.fresherwelcome.dto.VoterVoteSummary;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.service.UserService;
import com.example.fresherwelcome.service.VoteService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;
    private final UserService userService;

    public VoteController(VoteService voteService,UserService userService) {
        this.voteService = voteService;
        this.userService = userService;
    }

    @PostMapping("/cast")
    public ResponseEntity<?> castVote(@RequestBody VoteRequestDto dto, Authentication authentication) {
        try {
            User user = userService.getCurrentUser(authentication);

            // Pass username to service
            voteService.castVote(user.getId(), dto.getCandidateId(), dto.getCategory());

            return ResponseEntity.ok().body("Vote submitted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    @GetMapping("/myVotes")
    public ResponseEntity<Map<String, Long>> getUserVotes(Authentication authentication) {
        User user = userService.getCurrentUser(authentication); // still fine here
        Map<String, Long> votes = voteService.getUserVotes(user.getId());
        return ResponseEntity.ok(votes);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/voters")
    public ResponseEntity<Map<String, Object>> getAllVoterSummaries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "tnt") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Page<VoterVoteSummary> result = voteService.getAllVoterSummaries(page, size, sortBy, direction);

        Map<String, Object> response = new HashMap<>();
        response.put("content", result.getContent());
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber());
        return  ResponseEntity.ok(response);
    }
}

