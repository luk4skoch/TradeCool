package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/products")
public class ProductEndPoint {

    private final ProductService productService;

    @Autowired
    public ProductEndPoint(ProductService service) {

        this.productService = service;
    }

    @GetMapping
    public List<Product> getProductList() {
        return productService.getProductList();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product
                .orElseGet(() -> null);
    }

    @PostMapping("images")
    public Product addProduct(@RequestPart("images") MultipartFile[] images,
                              @RequestPart("product") Product product) {
        return productService.saveProduct(product, images);
    }

    @PostMapping
    public Product addProductNoImages(@RequestPart("product") Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("images")
    public Product editProductById(@RequestPart("images") MultipartFile[] images,
                                   @RequestPart("product") Product product) {
        return productService.saveProduct(product, images);
    }

    @PutMapping
    public Product editProductNoImages(@RequestPart("product") Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
