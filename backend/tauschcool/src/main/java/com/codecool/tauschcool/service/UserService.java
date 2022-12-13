package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private List<User> userList = new ArrayList<>();

    private int nextFreeId = 2;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        userRepository.save(new User("Fred", "fred@farm.com", "Maissau, NÖ", "no Picture", "userFred"));
        userRepository.save(new User( "Carl", "carl@tube.com", "Horn, NÖ", "blanc", "userCarl"));
    }

    public List<User> getUserList() {
        return userList;
    }

    public User getUser(long id) {
        for (User user : userList) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }


    public User editUser(User user) {
        Optional<User> userExists = userList.stream().filter(user1 -> user1.getId() == user.getId()).findFirst();
        if (userExists.isPresent()) {
            userList.remove(userExists.get());
        }
        userList.add(user);
        return user;
    }

    public void deleteUser(long id) {
        userList.remove(getUser(id));
    }

    public User addUser(User user) {
        userList.add(user);
        return user;
    }
}
