package com.codecool.tauschcool.model;

import java.util.ArrayList;
import java.util.List;

public class User {

    private int id;

    private String name;

    private String email;

    private String location;

    private String imagePath;

    private List<Product> productList;

    public User(int id, String name, String email, String location, String imagePath) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.location = location;
        this.imagePath = imagePath;
        productList = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void addProduct(List<Product> productList) {
        this.productList = productList;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", productList=" + productList +
                '}';
    }
}
