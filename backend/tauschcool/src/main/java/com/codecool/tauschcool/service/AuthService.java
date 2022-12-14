package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Role;
import com.codecool.tauschcool.model.RoleType;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.model.UserToken;
import com.codecool.tauschcool.repository.RoleRepository;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {
    private static Set<UserToken> tokens;
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

    public Optional<User> loginUser(String email, String password) {
       return userRepository.findByEmail(email);
    }

    public boolean isValid(UserToken token){
        return true;
    }

    public boolean emailExist(String email) {
        if (userRepository.findByEmail(email).isPresent()){
            return true;
        }else{
            return false;
        }
    }
}
