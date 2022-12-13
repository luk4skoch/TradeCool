package com.codecool.tauschcool.repository;

import com.codecool.tauschcool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
