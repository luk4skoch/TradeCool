package com.codecool.tauschcool.dto;

import com.codecool.tauschcool.model.Category;
import com.codecool.tauschcool.model.ProductStatus;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import java.util.Set;


@Data
@Builder
public class ProductDto {
    private Long id;
    private String title;
    private String description;

    private MultipartFile imageData;

    private ProductStatus status;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Category> categories;
}
