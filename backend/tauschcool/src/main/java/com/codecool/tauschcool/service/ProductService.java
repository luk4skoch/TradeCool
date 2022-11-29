package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.ProductStatus;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    // temporarily prefilled
    private List<Product> productList = List.of(
            new Product(0, "Vegetables", "A box of vegetables from my farm.", null, "food", 1234, ProductStatus.OPEN),
            new Product(1, "Plumber work", "I am a plumber and I can repair your toilet.", "wrong path", "service", 333, ProductStatus.OPEN)
    );

    public List<Product> getProductList() {
        return productList;
    }

    public Product getProductById(int id) {
        return productList.get(id);
    }

    public Product getProductFromJsonString(String jsonString) {
        JSONObject json = new JSONObject(jsonString);
        int id = productList.size();
        String title = json.getString("title");
        String description = json.getString("description");
        String imagePath = json.getString("imagePath");
        String category = json.getString("category");
        int userId = json.getInt("userId");
        ProductStatus status = getProductStatusByString(json.getString("status"));
        return new Product(id, title, description, imagePath, category, userId, status);
    }

    public ProductStatus getProductStatusByString(String string) {
        return Arrays.stream(ProductStatus.values())
                .filter(s -> s.name().equals(string))
                .findFirst().orElse(null);
    }

    public void addProductFromJsonString(String jsonString) {
        productList.add(getProductFromJsonString(jsonString));
    }
}
