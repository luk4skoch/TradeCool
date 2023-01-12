package com.codecool.tauschcool.repository;

import com.codecool.tauschcool.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
