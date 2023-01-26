package com.codecool.tauschcool.service;


import com.codecool.tauschcool.model.Product;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityAndValidationService {
    private final ProductService productService;

    public SecurityAndValidationService(ProductService productService) {
        this.productService = productService;
    }

    public boolean isTheProductOwner(Product productToEdit) {
        Product product = productService.getProductById(productToEdit.getId()).orElseThrow();
        return SecurityContextHolder.getContext().getAuthentication().getName().equals(product.getUser().getEmail());
    }

    public boolean isTheProductOwner(Long id) {
        Product product = productService.getProductById(id).orElseThrow();
        return SecurityContextHolder.getContext().getAuthentication().getName().equals(product.getUser().getEmail());
    }

}
