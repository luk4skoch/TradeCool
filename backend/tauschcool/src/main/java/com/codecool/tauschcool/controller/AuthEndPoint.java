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
        ResponseEntity response = null;
        try{
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(authService.createUserWithRoles(user, Set.of(RoleType.USER)));
        }catch (Exception e){
            response = bindExceptionCauseToResponse(e);
        }
        return response;
    }

    private ResponseEntity<String> bindExceptionCauseToResponse(Throwable exception) {
        String[] exceptionDetails =
                NestedExceptionUtils.getMostSpecificCause(exception)
                        .getMessage().split(":");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Signup error occured: " + exceptionDetails[exceptionDetails.length - 1]);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<String> validationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();
        String responseMessage = "User input validation error: ";
        if (fieldErrors.size() > 0) {
            for (FieldError err : fieldErrors) {
                responseMessage += "\n" + err.getField() + ":" + err.getDefaultMessage();
            }
        }
        return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
    }


}
