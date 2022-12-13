package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getUserList();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return service.getUserById(id);
    }

    @PostMapping()
    public void addNewUser(@RequestBody String jsonString) {
        service.addUserByJsonString(jsonString);
    }

    @PutMapping("/{id}")
    public void editUserById(@PathVariable int id, @RequestBody String jsonString) {
        service.editUserById(id, jsonString);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable int id) {
        service.deleteUserById(id);
    }
}
