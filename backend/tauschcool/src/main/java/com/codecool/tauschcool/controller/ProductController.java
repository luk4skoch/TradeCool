package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/product")
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
    public ResponseEntity<Object> addNewProduct(@RequestBody String jsonString) {
        service.addProductFromJsonString(jsonString);
        return new ResponseEntity<>(HttpStatus.OK);
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
