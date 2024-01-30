/* (C)2023 */
package com.adelium.web.mediaservice.service;

import com.adelium.web.mediaservice.config.FileStorageConfig;
import com.adelium.web.mediaservice.entity.FileMetadata;
import com.adelium.web.mediaservice.exception.StorageException;
import com.adelium.web.mediaservice.repository.FileMetadataRepository;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service class for handling file storage operations.
 */
@Service
public class FileStorageService {

    private final Logger logger = LoggerFactory.getLogger(FileStorageService.class);
    private final Path fileStoragePublic;
    private final Path fileStoragePrivate;
    private final FileMetadataRepository fileMetadataRepository;

    /**
     * Constructor.
     *
     * @param fileStorageConfig      file storage configuration
     * @param fileMetadataRepository file metadata repository
     * @throws StorageException if unable to create storage directories
     */
    public FileStorageService(
            FileStorageConfig fileStorageConfig, FileMetadataRepository fileMetadataRepository)
            throws StorageException {
        this.fileMetadataRepository = fileMetadataRepository;
        this.fileStoragePublic =
                Paths.get(fileStorageConfig.getPublicDirectory()).toAbsolutePath().normalize();
        this.fileStoragePrivate =
                Paths.get(fileStorageConfig.getPrivateDirectory()).toAbsolutePath().normalize();

        // try to create public and private storage directories if they not exist
        createDirectoryIfNotExists(this.fileStoragePublic);
        createDirectoryIfNotExists(this.fileStoragePrivate);
    }

    /**
     * Creates directory if it not exists.
     *
     * @param path path to directory
     * @throws StorageException if unable to create directory
     */
    private void createDirectoryIfNotExists(Path path) throws StorageException {
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (Exception ex) {
                throw new StorageException("Unable to create storage directory", ex);
            }
        }
    }

    /**
     * Stores file in storage.
     *
     * @param file     file to store
     * @param isPublic is file public
     * @param userName user name
     * @return unique file name
     */
    public String storeFile(MultipartFile file, boolean isPublic, String userName) {
        String originalFileName =
                StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileExtension = getFileExtension(originalFileName);
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        FileMetadata fileMetadata =
                FileMetadata.builder()
                        .fileName(uniqueFileName)
                        .originalFileName(originalFileName)
                        .fileType(file.getContentType())
                        .size(file.getSize())
                        .fileDownloadUri("/files/download/" + uniqueFileName)
                        .isPublic(isPublic)
                        .ownerName(userName)
                        .build();
        fileMetadataRepository.save(fileMetadata);

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

    /**
     * Gets file extension.
     *
     * @param fileName file name
     * @return file extension
     */
    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    /**
     * Loads file as resource.
     *
     * @param fileName file name
     * @return file resource
     */
    public Resource loadPublicFileAsResource(String fileName) {
        return loadFileAsResource(fileName, this.fileStoragePublic);
    }

    /**
     * Loads file as resource.
     *
     * @param fileName file name
     * @param userName user name
     * @return file resource
     */
    public Resource loadPrivateFileAsResource(String fileName, String userName) {

        FileMetadata fileMetadata = fileMetadataRepository.findByFileName(fileName).orElse(null);
        if (fileMetadata == null || !fileMetadata.getOwnerName().equals(userName)) {
            return null;
        }

        return loadFileAsResource(fileName, this.fileStoragePrivate);
    }

    /**
     * Loads file as resource.
     *
     * @param fileName file name
     * @param path     path to file
     * @return file resource
     */
    private Resource loadFileAsResource(String fileName, Path path) {
        try {
            Path filePath = path.resolve(fileName).normalize();
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
