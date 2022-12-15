package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.ImageData;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.service.ImageService;
import com.codecool.tauschcool.service.ProductService;
import com.codecool.tauschcool.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    @PostMapping
    public Product addProduct(@RequestPart("image") MultipartFile[] images,
                              @RequestPart("product") Product product) {
        return productService.saveProduct(product, images);
    }

    @PutMapping
    public Product editProductById(@RequestPart("image") MultipartFile[] images,
                                   @RequestPart("product") Product product) {
        return productService.saveProduct(product, images);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
