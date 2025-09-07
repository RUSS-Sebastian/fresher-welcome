package com.example.fresherwelcome.service;


import com.example.fresherwelcome.dto.CandidateVoteSummary;
import com.example.fresherwelcome.model.Candidate;
import com.example.fresherwelcome.model.Category;
import com.example.fresherwelcome.repository.CandidateRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class CandidateService {
    @Value("${app.upload.business.dir:uploads/kingsQueens}")
    private String uploadDir;

    private final CandidateRepo candidateRepo;

    public CandidateService(CandidateRepo candidateRepo) {
        this.candidateRepo = candidateRepo;
    }

    public Candidate saveCandidateWithImage(String name, Category category, MultipartFile imageFile) throws IOException {
        // Ensure upload dir exists
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();
        }

        // Save file with unique name
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Build URL (will be accessible because of your WebConfig mapping /kingsQueens/**)
        String imageUrl = "/kingsQueens/" + fileName;

        // Create and save Candidate
        Candidate candidate = new Candidate();
        candidate.setName(name);
        candidate.setCategory(category);
        candidate.setImageUrl(imageUrl);

        return candidateRepo.save(candidate);
    }

    public List<Candidate> getAllKings() {
        return candidateRepo.findByCategory(Category.KING);
    }

    // Service to get all Queens
    public List<Candidate> getAllQueens() {
        return candidateRepo.findByCategory(Category.QUEEN);
    }


    public List<CandidateVoteSummary> getKingsWithVotes() {
        return candidateRepo.getCandidatesWithVoteCount(Category.KING);
    }

    public List<CandidateVoteSummary> getQueensWithVotes() {
        return candidateRepo.getCandidatesWithVoteCount(Category.QUEEN);
    }
}


