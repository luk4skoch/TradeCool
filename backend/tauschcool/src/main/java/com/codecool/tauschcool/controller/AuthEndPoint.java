package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.RoleType;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthEndPoint {

    private AuthService authService;

    @Autowired

    public AuthEndPoint(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public User registerUser(@Valid @RequestBody User user){
        return authService.createUserWithRoles(user, Set.of(RoleType.USER));
    }
}
