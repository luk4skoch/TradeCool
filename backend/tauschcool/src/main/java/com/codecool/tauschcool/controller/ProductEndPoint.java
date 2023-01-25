package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.dto.UserPrinciple;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import com.codecool.tauschcool.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/products")
public class ProductEndPoint {
    private final ProductService productService;
    private final UserRepository userRepository;

    @Autowired
    public ProductEndPoint(ProductService service,
                           UserRepository userRepository) {

        this.productService = service;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Product> getProductList() {
        return productService.getProductList();
    }

    @GetMapping("users")
    public List<Product> getProductsByUser(Principal principal) {
        return productService.getProductsByUser(principal);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {

        Optional<Product> product = productService.getProductById(id);
        return product
                .orElseGet(() -> null);
    }

    @PostMapping("images")
    public Product addProduct(@RequestPart("images") MultipartFile[] images,
                              @RequestPart("product") Product product, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        product.setUser(user);
        return productService.saveProduct(product, images, principal);
    }

    @PostMapping
    public Product addProductNoImages(@RequestPart("product") Product product, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        product.setUser(user);
        return productService.saveProduct(product, principal);
    }

    @PutMapping("images")
    public Product editProductById(@RequestPart("images") MultipartFile[] images,
                                   @RequestPart("product") Product product,
                                   Principal principal) {
        return productService.saveProduct(product, images, principal);
    }

    @PutMapping
    public Product editProductNoImages(@RequestPart("product") Product product, Principal principal) {
        return productService.saveProduct(product, principal);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id, Principal principal) {
        productService.deleteProductById(id, principal);
    }
}
