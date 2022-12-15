package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Role;
import com.codecool.tauschcool.model.RoleType;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.RoleRepository;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    public User createUserWithRoles(User user, Set<RoleType> roleTypes){
        Set<Role> roles = new HashSet<>();
        for (RoleType roleType : roleTypes) {
            Optional<Role> role = roleRepository.findByType(roleType);
            if (role.isPresent()) roles.add(role.get());
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }
}
