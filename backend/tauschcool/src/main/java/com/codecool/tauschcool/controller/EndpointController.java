package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.ProductStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/")
public class EndpointController {

    // temporarily prefilled
    private List<Product> productList = List.of(
            new Product(0, "Vegetables", "A box of vegetables from my farm.", null, "food", 1234, ProductStatus.OPEN),
            new Product(1, "Plumber work", "I am a plumber and I can repair your toilet.", "wrong path", "service", 333, ProductStatus.OPEN)
    );

    @GetMapping(value = "list")
    public List<Product> getProductList() {
        return productList;
    }


}
