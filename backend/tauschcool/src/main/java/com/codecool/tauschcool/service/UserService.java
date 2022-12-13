package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.User;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private List<User> userList = new ArrayList<>();

    private int nextFreeId = 2;

    public UserService() {
        userList.add(new User(0, "Fred", "fred@farm.com", "Maissau, NÖ", "no Picture"));
        userList.add(new User(1, "Carl", "carl@tube.com", "Horn, NÖ", "blanc"));
    }

    public List<User> getUserList() {
        return userList;
    }

    public User getUserById(int id) {
        for (User user : userList) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    public void addUserByJsonString(String jsonString) {
        JSONObject object = new JSONObject(jsonString);
        int id = nextFreeId;
        nextFreeId++;
        String name = object.getString("name");
        String email = object.getString("email");
        String location = object.getString("location");
        String imagePath = object.getString("imagePath");
        User user = new User(id, name, email, location, imagePath);
        userList.add(user);
    }

    public void editUserById(int id, String jsonString) {
        User user = getUserById(id);
        JSONObject object = new JSONObject(jsonString);
        user.setName(object.getString("name"));
        user.setEmail(object.getString("email"));
        user.setLocation(object.getString("location"));
        user.setImagePath(object.getString("imagePath"));
    }

    public void deleteUserById(int id) {
        userList.remove(getUserById(id));
    }
}
