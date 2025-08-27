package com.example.fresherwelcome.controller;

import com.example.fresherwelcome.dto.EventDto;
import com.example.fresherwelcome.dto.UserMessageRequestDto;
import com.example.fresherwelcome.dto.UserMessageTitleContentDto;
import com.example.fresherwelcome.model.Event;
import com.example.fresherwelcome.model.UserMessage;
import com.example.fresherwelcome.service.UserMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class UserMessageController {

    private final UserMessageService messageService;



    public UserMessageController(UserMessageService service){
        this.messageService = service;
    }

    @PostMapping
    public ResponseEntity<?> createMessage(
            @Valid @RequestBody UserMessageRequestDto dto) {

        UserMessage savedMessage = messageService.createMessage(dto);
        return ResponseEntity.ok("Message sent successfully with ID: " + savedMessage.getId());
    }


    // GET messages for a specific userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserMessageTitleContentDto>> getMessagesByUser(@PathVariable Long userId) {
        List<UserMessageTitleContentDto> messages = messageService.getMessagesByUserId(userId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> countUnreadMessages(@PathVariable Long userId) {
        long count = messageService.countUnreadMessages(userId);
        return ResponseEntity.ok(count);
    }

    @PatchMapping("/read")
    public ResponseEntity<?> markMessagesAsRead(@RequestBody List<Long> messageIds) {
        messageService.markMessagesAsRead(messageIds);
        return ResponseEntity.ok("Messages marked as read");
    }



}
