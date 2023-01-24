package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserEndpoint {

    private final UserService userService;
    @Autowired
    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getUserList();
    }

    @GetMapping("{id}")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.getUser(id);
    }

    @PostMapping
    public void addNewUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("{id}")
    public void editUserById(@RequestBody User user) {
        userService.editUser(user);
    }

    @DeleteMapping("{id}")
    public void deleteUserById(@PathVariable long id) {
        userService.deleteUser(id);
    }
}
