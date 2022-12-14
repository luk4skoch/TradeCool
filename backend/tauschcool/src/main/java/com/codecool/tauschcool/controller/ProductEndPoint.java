package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.service.ProductService;
import com.codecool.tauschcool.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // @PostMapping
    // public ResponseEntity<Product> addNewProduct(@RequestBody Product product) {
    // return new ResponseEntity<>(productService.saveProduct(product),
    // HttpStatus.CREATED);
    // }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestPart("image") MultipartFile image,
            @RequestPart("product") Product product) throws IOException {
        if (image != null) {
            byte[] imageForProduct = ImageUtils.compressImage(image.getBytes());
            product.setImageData(imageForProduct);
        }
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Product> editProductById(@RequestPart("image") MultipartFile image,
           @RequestPart("product") Product product) throws IOException {
        if (image != null) {
            byte[] imageForProduct = ImageUtils.compressImage(image.getBytes());
            product.setImageData(imageForProduct);
        }
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
