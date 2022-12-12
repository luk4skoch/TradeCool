package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/products")
public class ProductEndpoint {
    private ProductService productService;

    public ProductEndpoint(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProductList() {
        return productService.getProducts();
    }

    @GetMapping("{id}")
    public Product getProductById(@PathVariable int id) throws ElementNotFound {
        return productService.getProductById(id)
                .orElseThrow(ElementNotFound::new);
    }

    @PostMapping
    public Product addNewProduct(@Valid @RequestBody Product product) {
        return productService.save(product);
    }

    @PutMapping
    public Product editProductById(@Valid @RequestBody Product product) {
        return productService.update(product);
    }

    @DeleteMapping("{id}")
    public void deleteProductById(@PathVariable int id) {
        productService.delete(id);
    }
}
