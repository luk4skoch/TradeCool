package com.codecool.tauschcool.controller;

import com.codecool.tauschcool.config.SecurityConfig;
import com.codecool.tauschcool.model.Product;
import com.codecool.tauschcool.model.User;
import com.codecool.tauschcool.service.ProductService;
import com.codecool.tauschcool.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Import(SecurityConfig.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
class ProductEndPointTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    ProductService productService;
    @MockBean
    UserService userService;

    String uri = "/api/products";

    @BeforeEach
    void setup() {
        User user = User.builder().username("test@test.com").email("test@test.com").build();
        Long id = 1L;
        Product product = Product.builder().id(id).user(user).build();
        when(productService.getProductById(id)).thenReturn(Optional.of(product));
    }

    @Test
    void getProductListNotLoggedIn() throws Exception {
        mockMvc.perform(get(uri))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @WithMockUser(username = "test@test.com")
    void getProductListLoggedIn() throws Exception {
        mockMvc.perform(get(uri))
                .andExpect(status().is2xxSuccessful());
    }


    @Test
    void getProductById() throws Exception {
        String uriWithId = uri + "/1";

        mockMvc.perform(get(uriWithId))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void addProduct() {

    }

    @Test
    void addProductNotLoggedIn() throws Exception {
        mockMvc.perform(post(uri)).andExpect(status().is4xxClientError());
    }

    @Test
    void addProductNoImages() {
    }

    @Test
    void editProductById() {
    }

    @Test
    void editProductNoImages() {
    }

    @Test
    void deleteProductByIdNotLoggedIn() throws Exception {
        String uriWithId = uri + "/1";

        mockMvc.perform(delete(uriWithId))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @WithMockUser(username = "test1@test.com")
    void deleteProductByIdNotLoggedInAsTheProductOwner() throws Exception {
        String uriWithId = uri + "/1";

        mockMvc.perform(delete(uriWithId))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @WithMockUser(username = "test@test.com")
    void deleteProductByIdLoggedInAsTheProductOwner() throws Exception {
        String uriWithId = uri + "/1";

        mockMvc.perform(delete(uriWithId))
                .andExpect(status().is2xxSuccessful());
    }
}