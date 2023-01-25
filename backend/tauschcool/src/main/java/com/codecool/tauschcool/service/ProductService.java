package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Category;
import com.codecool.tauschcool.model.ImageData;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.repository.CategoryRepository;
import com.codecool.tauschcool.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.imageService = imageService;
    }

    public List<Product> getProductList() {
        return productRepository.findAll().stream()
                .peek(product ->
                        product.setImages(imageService.decompressImages(product.getImages())))
                .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        assert product != null;
        product.setImages(imageService.decompressImages(product.getImages()));
        return Optional.of(product);
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

    public Product saveProduct(Product product) {
        if (product.getUser() == null) {

        }
        product.setCategories(getCategories(product.getCategories()));
        try {
            product.setImages(imageService.compressImages(product.getImages()));
        } catch (NullPointerException ignored) {}
        return productRepository.save(product);
    }

    public Product saveProduct(Product product, MultipartFile[] images) {
        product.setCategories(getCategories(product.getCategories()));
        if (images.length != 0) {
            Set<ImageData> imageSet = Arrays.stream(images).map(
                    image -> {
                        try {
                            return imageService.uploadImage(image);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
            ).collect(Collectors.toSet());
            if (product.getImages() != null) {
                Set<ImageData> temp = imageService.compressImages(product.getImages());
                temp.addAll(imageSet);
                product.setImages(temp);
            } else {
                product.setImages(imageSet);
            }
        }
        return productRepository.save(product);
    }
}
