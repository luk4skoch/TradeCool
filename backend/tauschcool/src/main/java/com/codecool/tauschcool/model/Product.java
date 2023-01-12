package com.codecool.tauschcool.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<ImageData> images;

//    @OneToOne
//    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Category> categories;


    private ProductStatus status;
}
