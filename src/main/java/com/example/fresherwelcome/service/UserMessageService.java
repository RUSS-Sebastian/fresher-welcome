package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.UserMessageRequestDto;
import com.example.fresherwelcome.dto.UserMessageTitleContentDto;
import com.example.fresherwelcome.model.User;
import com.example.fresherwelcome.model.UserMessage;
import com.example.fresherwelcome.model.MessageStatus;
import com.example.fresherwelcome.repository.UserMessageRepo;
import com.example.fresherwelcome.repository.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserMessageService {

    private final UserMessageRepo messageRepository;

    private final UserRepo userRepository;


    public UserMessageService(UserMessageRepo repo1, UserRepo repo2){
        this.messageRepository = repo1;
        this.userRepository = repo2;
    }

    public UserMessage createMessage(UserMessageRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserMessage message = new UserMessage();
        message.setUser(user);
        message.setTitle(dto.getTitle());
        message.setContent(dto.getContent());
        message.setStatus(MessageStatus.UNREAD);

        return messageRepository.save(message);
    }

    // Fetch messages for a specific userId
    public List<UserMessageTitleContentDto> getMessagesByUserId(Long userId) {
        List<UserMessage> messages = messageRepository.findByUserId(userId);
        return messages.stream()
                .map(msg -> new UserMessageTitleContentDto(msg.getTitle(), msg.getContent(),msg.getCreatedAt(),msg.getStatus(),msg.getId()))
                .collect(Collectors.toList());
    }

    public long countUnreadMessages(Long userId) {
        return messageRepository.countUnreadMessagesByUserId(userId);
    }

    @Transactional
    public void markMessagesAsRead(List<Long> messageIds) {
        messageRepository.markAsReadBulk(messageIds);
    }


}
