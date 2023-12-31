/* (C)2023 */
package com.adelium.web.mediaservice.service;

import com.adelium.web.mediaservice.config.FileStorageConfig;
import com.adelium.web.mediaservice.entity.FileMetadata;
import com.adelium.web.mediaservice.repository.FileMetadataRepository;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    private final Path fileStoragePublic;
    private final Path fileStoragePrivate;
    private final FileMetadataRepository fileMetadataRepository;

    public FileStorageService(
            FileStorageConfig fileStorageConfig, FileMetadataRepository fileMetadataRepository) {
        this.fileMetadataRepository = fileMetadataRepository;
        this.fileStoragePublic =
                Paths.get(fileStorageConfig.getPublicDirectory()).toAbsolutePath().normalize();
        this.fileStoragePrivate =
                Paths.get(fileStorageConfig.getPrivateDirectory()).toAbsolutePath().normalize();

        if (!Files.exists(this.fileStoragePublic)) {
            try {
                Files.createDirectories(this.fileStoragePublic);
            } catch (Exception ex) {
                throw new RuntimeException("Impossible de créer le répertoire de stockage", ex);
            }
        }
        if (!Files.exists(this.fileStoragePrivate)) {
            try {
                Files.createDirectories(this.fileStoragePrivate);
            } catch (Exception ex) {
                throw new RuntimeException("Impossible de créer le répertoire de stockage", ex);
            }
        }
    }

    public String storeFile(MultipartFile file, boolean isPublic, String userName) {
        String originalFileName =
                StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileMetadata fileMetadata =
                FileMetadata.builder()
                        .fileName(originalFileName)
                        .fileType(file.getContentType())
                        .size(file.getSize())
                        .fileDownloadUri("/files/download/" + originalFileName)
                        .isPublic(isPublic)
                        .ownerName(userName)
                        .build();
        fileMetadataRepository.save(fileMetadata);
        String fileExtension = getFileExtension(originalFileName);
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        try {
            Path targetLocation =
                    isPublic
                            ? this.fileStoragePublic.resolve(uniqueFileName)
                            : this.fileStoragePrivate.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return uniqueFileName;
        } catch (IOException ex) {
            return null;
        }
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    public Resource loadFileAsResource(String fileName, boolean isPublic, String userName) {

        if (!isPublic) {
            FileMetadata fileMetadata =
                    fileMetadataRepository.findByFileName(fileName).orElse(null);
            if (fileMetadata == null || !fileMetadata.getOwnerName().equals(userName)) {
                return null;
            }
        }
        try {
            Path filePath =
                    isPublic
                            ? this.fileStoragePublic.resolve(fileName).normalize()
                            : this.fileStoragePrivate.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                return null;
            }
        } catch (MalformedURLException ex) {
            return null;
        }
    }
}
