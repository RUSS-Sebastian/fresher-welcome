package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.CandidateVoteSummary;
import com.example.fresherwelcome.model.Candidate;
import com.example.fresherwelcome.model.Category;
import com.example.fresherwelcome.service.CandidateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Candidate> saveCandidate(
            @RequestParam String name,
            @RequestParam Category category,
            @RequestParam MultipartFile imageFile
    ) {
        try {
            Candidate saved = candidateService.saveCandidateWithImage(name, category, imageFile);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/kings")
    public ResponseEntity<List<CandidateVoteSummary>> getKingsWithVotes() {
        return ResponseEntity.ok(candidateService.getKingsWithVotes());
    }

    @GetMapping("/queens")
    public ResponseEntity<List<CandidateVoteSummary>> getQueensWithVotes() {
        return ResponseEntity.ok(candidateService.getQueensWithVotes());
    }


}