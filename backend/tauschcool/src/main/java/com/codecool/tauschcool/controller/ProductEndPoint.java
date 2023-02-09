package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.repository.UserRepository;
import com.codecool.tauschcool.service.ProductService;
import com.codecool.tauschcool.service.SecurityValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final SecurityValidationService securityValidationService;

    @Autowired
    public ProductEndPoint(ProductService service,
                           UserRepository userRepository, SecurityValidationService securityValidationService) {

        this.productService = service;
        this.userRepository = userRepository;
        this.securityValidationService = securityValidationService;
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

    @PreAuthorize("isAuthenticated()")
    @PostMapping("images")
    public Product addProduct(@RequestPart("images") MultipartFile[] images,
                              @RequestPart("product") Product product, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();;
        product.setUser(user);
        return productService.saveProduct(product, images);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public Product addProductNoImages(@RequestPart("product") Product product, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        product.setUser(user);
        return productService.saveProduct(product);
    }


    //@PreAuthorize("@securityValidationService.isTheProductOwner(#product, #principal)")
    @PutMapping("images")
    public Product editProductById(@RequestPart("images") MultipartFile[] images,
                                   @RequestPart("product") Product product, Principal principal) {
        return productService.saveProduct(product, images);
    }

   // @PreAuthorize("@securityValidationService.isTheProductOwner(#product, #principal)")
    @PutMapping
    public Product editProductNoImages(@RequestPart("product") Product product, Principal principal) {
        return productService.saveProduct(product);
    }



    //@PreAuthorize("isAuthenticated() and @securityValidationService.isTheProductOwner(#id, #principal)")
    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
