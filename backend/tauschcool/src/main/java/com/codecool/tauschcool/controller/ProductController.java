package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.ProductStatus;
import com.codecool.tauschcool.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService service;

    @GetMapping("/all")
    public List<Product> getProductList() {
        return service.getProductList();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PostMapping()
    public void addNewProduct(@RequestBody String jsonString) {
        service.addProductFromJsonString(jsonString);
    }

    @PutMapping("/{id}")
    public void editProductById(@PathVariable int id, @RequestBody String jsonString) {
        service.editProductById(id, jsonString);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable int id) {
        service.deleteProductById(id);
    }
}
