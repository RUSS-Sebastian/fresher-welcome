package com.example.fresherwelcome.dto;

import com.example.fresherwelcome.model.MessageStatus;

import java.time.LocalDateTime;

public class UserMessageTitleContentDto {
    private String title;
    private String content;
    private MessageStatus status;
    private LocalDateTime submittedTime;
    private long id;

    public UserMessageTitleContentDto(String title, String content,LocalDateTime time,MessageStatus status,long id) {
        this.title = title;
        this.content = content;
        this.submittedTime = time;
        this.status = status;
        this.id = id;
    }

    // Getters and setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedTime() {
        return submittedTime;
    }

    public void setSubmittedTime(LocalDateTime submittedTime) {
        this.submittedTime = submittedTime;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
