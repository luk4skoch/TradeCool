package com.codecool.tauschcool.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class Product {

    private int id;
    @NotBlank(message = "The title cannot be blank")
    private String title;

    @Size(max = 255)
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

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", category='" + category + '\'' +
                ", userId=" + userId +
                ", status=" + status +
                '}';
    }
}
