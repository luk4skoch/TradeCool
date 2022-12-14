package com.codecool.tauschcool.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String imagePath;
    private String category;
    private ProductStatus status;

    @ManyToOne
    private User user;

    public Product(String title, String description, String imagePath, String category, ProductStatus status) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.category = category;
        this.status = status;
    }
}
