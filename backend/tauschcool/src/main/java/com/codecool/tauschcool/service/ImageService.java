package com.codecool.tauschcool.service;

import com.codecool.tauschcool.model.ImageData;
import com.codecool.tauschcool.repository.ImageRepository;
import com.codecool.tauschcool.util.ImageUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public ImageData uploadImage(MultipartFile file) throws IOException {
        return imageRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
    }

    public byte[] downloadImage(String filename) {
        Optional<ImageData> dbImageData = imageRepository.findByName(filename);
        return ImageUtils.decompressImage(dbImageData.get().getImageData());
    }

    public byte[] downloadImage(Long id) {
        Optional<ImageData> dbImageData = imageRepository.findById(id);
        return ImageUtils.decompressImage(dbImageData.get().getImageData());
    }

    public ImageData decompressImage(ImageData image) {
        image.setImageData(ImageUtils.decompressImage(image.getImageData()));
        return image;
    }

    public Set<ImageData> decompressImages(Set<ImageData> imageDataSet) {
        return imageDataSet.stream().map(this::decompressImage).collect(Collectors.toSet());
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
