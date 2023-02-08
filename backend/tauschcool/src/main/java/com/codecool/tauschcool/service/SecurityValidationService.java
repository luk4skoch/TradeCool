package com.codecool.tauschcool.service;


import com.codecool.tauschcool.model.Product;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class SecurityValidationService {
    private final ProductService productService;

    public SecurityValidationService(ProductService productService) {
        this.productService = productService;
    }

    public boolean isTheProductOwner(Product productToEdit, Principal principal) {
        Product product = productService.getProductById(productToEdit.getId()).orElseThrow();
        return getUserName(principal).equals(product.getUser().getEmail());
    }

    public boolean isTheProductOwner(Long id, Principal principal) {
        Product product = productService.getProductById(id).orElseThrow();
        return getUserName(principal).equals(product.getUser().getEmail());
    }
private String getUserName(Principal principal) {
        if (principal == null) {
            return SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return principal.getName();
}
}