package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(long id) {
        return this.userRepository.findById(id);
    }


    public User editUser(User user) {
        return this.userRepository.save(user);
    }

    public void deleteUser(long id) {
        Optional<User> user = getUser(id);
        if (user.isPresent()){
            this.userRepository.delete(user.get());
        }
    }

    public User addUser(User user) {
        return this.userRepository.save(user);
    }
}
