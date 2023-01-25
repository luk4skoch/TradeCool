package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Message;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.MessageRepository;
import com.codecool.tauschcool.repository.ProductRepository;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<Message> getAllMessagesOfTransaction(Long senderId, Long productId, Long receiverId) {
        User sender = userRepository.findById(senderId).orElse(null);
        User receiver = userRepository.findById(receiverId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        List<Message> allMessages = messageRepository.findAll().stream()
                .filter(message -> message.getProduct().equals(product))
                .toList();
        List<Message> senderMessages = allMessages.stream()
                .filter(message -> message.getSender().equals(sender))
                .filter(message -> message.getReceiverId().equals(receiverId))
                .toList();
        List<Message> receiverMessages = allMessages.stream()
                .filter(message -> message.getSender().equals(receiver))
                .filter(message -> message.getReceiverId().equals(senderId))
                .toList();
        List<Message> messagesOfTransaction = new ArrayList<>(senderMessages);
        messagesOfTransaction.addAll(receiverMessages);
        Collections.sort(messagesOfTransaction);
        return messagesOfTransaction;
    }

    public void postNewMessage(Message message) {
        User sender = userRepository.findById(message.getSender().getId()).orElseGet(() -> userRepository.save(message.getSender()));
        Product product = productRepository.findById(message.getProduct().getId()).orElseGet(() -> productRepository.save(message.getProduct()));
        message.setSender(sender);
        message.setProduct(product);
        message.setTimestamp(Timestamp.from(Instant.now()));
        messageRepository.save(message);
    }
}
