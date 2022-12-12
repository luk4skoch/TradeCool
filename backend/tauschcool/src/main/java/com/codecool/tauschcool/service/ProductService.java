package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public class ProductService {

    private final List<Product> products;
    private int nextFreeProductId;

    public ProductService(List<Product> products, int nextFreeProductId) {
        this.products = products;
        this.nextFreeProductId = nextFreeProductId;
    }

    public List<Product> getProducts() {
        return products;
    }

    public Optional<Product> getProductById(int id) {
        return products.stream()
                .filter(product -> product.getId() == id)
                .findFirst();
    }

    public Product save(Product product) {
        product.setId(nextFreeProductId++);
        products.add(product);
        return product;
    }

    public Product update(Product product) {
        products.removeIf(p -> p.getId() == product.getId());
        products.add(product);
        return product;
    }

    public void delete(int id) {
        products.remove(getProductById(id));
    }
}
