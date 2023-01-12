package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Message;
import com.codecool.tauschcool.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/message")
public class MessageEndpoint {

    private final MessageService messageService;

    public MessageEndpoint(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{senderId}/{productId}/{receiverId}")
    public List<Message> getAllMessagesOfTransaction(@PathVariable Long senderId, @PathVariable Long productId, @PathVariable Long receiverId) {
        return messageService.getAllMessagesOfTransaction(senderId, productId, receiverId);
    }

    @PostMapping
    public void postNewMessage(@RequestBody Message message) {
        messageService.postNewMessage(message);
    }
}
