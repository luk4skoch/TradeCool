package com.codecool.tauschcool.error;

import org.springframework.core.NestedExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler(Exception.class)
    private ResponseEntity<String> bindExceptionCauseToResponse(Exception exception) {
        String[] exceptionDetails =
                NestedExceptionUtils.getMostSpecificCause(exception)
                        .getMessage().split(":");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Signup error occured: " + exceptionDetails[exceptionDetails.length - 1]);
    }

}
