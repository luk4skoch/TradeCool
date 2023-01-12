package com.codecool.tauschcool.config;

import com.codecool.tauschcool.dto.UserPrincipalDto;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TradeCoolUserDetailsService implements UserDetailsService {
    public TradeCoolUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isPresent()) {
            return new UserPrincipalDto(user.get());
        } else throw new UsernameNotFoundException("User not found!");
    }
}
