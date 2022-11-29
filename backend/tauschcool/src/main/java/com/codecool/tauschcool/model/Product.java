package com.codecool.tauschcool.model;

import org.json.JSONObject;

public class Product {

    private int id;

    private String title;

    private String description;

    private String imagePath;

    private String category;

    private int userId;

    private ProductStatus status;

    public Product(int id, String title, String description, String imagePath, String category, int userId, ProductStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.category = category;
        this.userId = userId;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public JSONObject getJson() {
        JSONObject json = new JSONObject();
        json.append("title", title);
        json.append("description", description);
        json.append("imagePath", imagePath);
        json.append("category", category);
        json.append("userId", userId);
        json.append("status", status.name());
        return json;
    }
}
