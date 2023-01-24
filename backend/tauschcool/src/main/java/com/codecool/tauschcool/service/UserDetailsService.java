package com.codecool.tauschcool.service;

import com.codecool.tauschcool.dto.UserPrinciple;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isPresent()) {
            return new UserPrinciple(user.get());
        } else {
            throw new UsernameNotFoundException("User with " + username + "not found.");
        }
    }
}
