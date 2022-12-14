package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.ProductStatus;
import com.codecool.tauschcool.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
        String vegetableLink = "https://apod.nasa.gov/apod/image/2212/SkyArt_Cobianchi_2048.jpg";
        String toiletLink = "https://images.squarespace-cdn.com/content/v1/5b3165ed3917ee036af2fc5b/1602258338104-KCTQLI0M00Y9UYT147DE/200928SpringerPlumbingjs-76.jpg?format=1000w";
        Product product1 = new Product("Vegetables", "A box of vegetables from my farm.", vegetableLink, "food",  ProductStatus.OPEN);
        Product product2 = new Product("Plumber work", "I am a plumber and I can repair your toilet.", toiletLink, "service",  ProductStatus.OPEN);
        this.productRepository.save(product1);
        this.productRepository.save(product2);
    }

    public List<Product> getProductList() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }


    public Product addNewProduct(Product product) {
        productRepository.save(product);
        return product;
    }


    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public Product editProductById(Product product) {
        Product productToUpdate = getProductById(product.getId()).orElseThrow();
        if (product.getTitle() != null) productToUpdate.setTitle(product.getTitle());
        if (product.getCategory() != null) productToUpdate.setCategory(product.getCategory());
        if (product.getStatus() != null) productToUpdate.setStatus(product.getStatus());
        if (product.getDescription() != null) productToUpdate.setDescription(product.getDescription());
        if (product.getImagePath() != null) productToUpdate.setImagePath(product.getImagePath());
        productRepository.save(productToUpdate);
        return productToUpdate;
    }
}
