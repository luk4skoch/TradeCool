package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.RoleType;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.service.AuthService;
import com.codecool.tauschcool.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthEndPoint {
    private final Logger LOG = LoggerFactory.getLogger(AuthEndPoint.class);
    private AuthService authService;
    private TokenService tokenService;
    public AuthEndPoint(AuthService authService, TokenService tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
    }

    @PostMapping("signin")
    public String signIn(Authentication authentication) {
        LOG.debug("Token requested for {}",authentication.getName());
        String token = tokenService.generateToken(authentication);
        LOG.debug("Token granted {}",token);
        return token;
    }

    @PostMapping("signup")
    public ResponseEntity signUp(@Valid @RequestBody User user){
        //ResponseEntity response = null;
        //try{
          return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(authService.createUserWithRoles(user, Set.of(RoleType.USER)));
        //}catch (Exception e){
          //  response = bindExceptionCauseToResponse(e);
        //}
        //return response;
    }


}
