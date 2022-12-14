package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Category;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.repository.CategoryRepository;
import com.codecool.tauschcool.repository.ProductRepository;
import com.codecool.tauschcool.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getProductList() {

        return productRepository.findAll().stream().peek(product ->
                product.setImageData(ImageUtils.decompressImage(product.getImageData()))).collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }


    public Product addNewProduct(Product product) {
        product.setCategories(getCategories(product.getCategories()));
        productRepository.save(product);
        return product;
    }

    private Set<Category> getCategories(Set<Category> categories) {
        if (categories == null) return null;
        categories.forEach(
                category -> categoryRepository.findByName(category.getName())
                        .ifPresentOrElse(
                                categoryDb -> category.setId(categoryDb.getId()),
                                () -> categoryRepository.save(category)
                        )
        );
        return categories;
    }


    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public Product editProductById(Product product) {
//        Product productToUpdate = getProductById(product.getId()).orElseThrow();
//        if (product.getTitle() != null) productToUpdate.setTitle(product.getTitle());
//        if (product.getCategories() != null) productToUpdate.setCategories(getCategories(product.getCategories())); // ?
//        if (product.getStatus() != null) productToUpdate.setStatus(product.getStatus());
//        if (product.getDescription() != null) productToUpdate.setDescription(product.getDescription());
//        if (product.getImageData() != null) productToUpdate.setImageData(product.setImageData(););
        productRepository.save(product);
        return product;
    }

    public Product saveProduct(Product product) {
        productRepository.save(product);
        return product;
    }
}
