package com.codecool.tauschcool.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String email;

    private String location;

    private String imagePath;

    private String password;
    @OneToMany
    private Set<Product> productList;

    public User(String name, String email, String location, String imagePath, String password) {
        this.name = name;
        this.email = email;
        this.location = location;
        this.imagePath = imagePath;
        this.password = password;
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
