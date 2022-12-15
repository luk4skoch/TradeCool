package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.RoleType;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.model.UserToken;
import com.codecool.tauschcool.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auth_bup")
public class AuthEndPoint_bup {

    private AuthService authService;

    @Autowired

    public AuthEndPoint_bup(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public User registerUser(@Valid @RequestBody User user){
        return authService.createUserWithRoles(user, Set.of(RoleType.USER));
    }

    @PostMapping("login")
    public ResponseEntity<UserToken> loginUser(@RequestParam("email") String email, @RequestParam("password") String password){
        Optional<User> user =  authService.loginUser(email,password);
        if (user.isPresent()){
            User registeredUser = user.get();
            if (registeredUser.getPassword().equals(password)) {
                UserToken userToken = new UserToken(registeredUser.getId(), registeredUser.getName(), UUID.randomUUID().toString());
                return new ResponseEntity<>(userToken, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
