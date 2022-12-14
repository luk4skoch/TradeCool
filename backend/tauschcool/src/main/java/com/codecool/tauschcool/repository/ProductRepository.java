package com.codecool.tauschcool.repository;

import com.codecool.tauschcool.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {

}
