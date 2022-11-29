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

    /**
     * Edits Product with data from a jsonString.
     * ProductId (id) and userId won't change.
     * @param id
     * @param jsonString
     */
    public void editProductById(int id, String jsonString) {
        Product product = getProductById(id);
        JSONObject json = new JSONObject(jsonString);
        product.setTitle(json.getString("title"));
        product.setDescription(json.getString("description"));
        product.setImagePath(json.getString("imagePath"));
        product.setCategory(json.getString("category"));
        product.setStatus(getProductStatusByString(json.getString("status")));
    }
}
