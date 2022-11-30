package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.ProductStatus;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    // temporarily prefilled
    private List<Product> productList = new ArrayList<>();
    private int nextFreeProductId = 2;

    public ProductService() {
        String vegetableLink = "data:image/jpeg;base64,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";
        String toiletLink = "https://images.squarespace-cdn.com/content/v1/5b3165ed3917ee036af2fc5b/1602258338104-KCTQLI0M00Y9UYT147DE/200928SpringerPlumbingjs-76.jpg?format=1000w";
        productList.add(new Product(0, "Vegetables", "A box of vegetables from my farm.", vegetableLink, "food", 1234, ProductStatus.OPEN));
        productList.add(new Product(1, "Plumber work", "I am a plumber and I can repair your toilet.", toiletLink, "service", 333, ProductStatus.OPEN));
    }

    public List<Product> getProductList() {
        return productList;
    }

    public Product getProductById(int id) {
        for (Product product : productList) {
            if (product.getId() == id) {
                return product;
            }
        }
        return null;
    }

    public Product getProductFromJsonString(String jsonString) {
        JSONObject object = new JSONObject(jsonString);
        int id = nextFreeProductId;
        nextFreeProductId++;
        String title = object.getString("title");
        String description = object.getString("description");
        String imagePath = object.getString("imagePath");
        String category = object.getString("category");
        int userId = object.getInt("userId");
        ProductStatus status = getProductStatusByString(object.getString("status").toUpperCase());
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
        JSONObject object = new JSONObject(jsonString);
        product.setTitle(object.getString("title"));
        product.setDescription(object.getString("description"));
        product.setImagePath(object.getString("imagePath"));
        product.setCategory(object.getString("category"));
        product.setStatus(getProductStatusByString(object.getString("status").toUpperCase()));
    }

    public void deleteProductById(int id) {
        productList.remove(getProductById(id));
    }
}
