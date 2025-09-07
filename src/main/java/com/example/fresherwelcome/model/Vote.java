package com.example.fresherwelcome.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "votes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"userId", "category"}) // ensures 1 vote per category per user
        }
)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key in "profiles" table
    private User user; // later can be ManyToOne -> User

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Category category; // KING or QUEEN

    @Column(nullable = false, updatable = false)
    private LocalDateTime votedAt = LocalDateTime.now();

    public Vote() {}

    public Long getVoteId() {
        return voteId;
    }

    public void setVoteId(Long voteId) {
        this.voteId = voteId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    // ✅ Auto-sync category when setting candidate
    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
        this.category = candidate.getCategory();
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDateTime getVotedAt() {
        return votedAt;
    }

    public void setVotedAt(LocalDateTime votedAt) {
        this.votedAt = votedAt;
    }
}
