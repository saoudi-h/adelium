/* (C)2023 */
package com.adelium.web.mediaservice.controller;

import com.adelium.web.mediaservice.dto.UploadResponse;
import com.adelium.web.mediaservice.service.FileStorageService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * File controller.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    /**
     * File storage service.
     */
    private final FileStorageService fileStorageService;

    /**
     * Uploads file.
     *
     * @param file      file
     * @param isPublic  is public
     * @param principal principal
     * @return upload response
     */
    @PostMapping("/upload/{isPublic}")
    public ResponseEntity<UploadResponse> uploadPublicFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable("isPublic") boolean isPublic,
            Principal principal) {
        String fileName = fileStorageService.storeFile(file, isPublic, principal.getName());
        String fileDownloadUri =
                WebMvcLinkBuilder.linkTo(
                                WebMvcLinkBuilder.methodOn(FileController.class)
                                        .downloadFile(fileName, isPublic, principal))
                        .toUri()
                        .toString();

        return ResponseEntity.ok(UploadResponse.builder().url(fileDownloadUri).build());
    }

    /**
     * Downloads file.
     *
     * @param fileName  file name
     * @param isPublic  is public
     * @param principal principal
     * @return file
     */
    @GetMapping("/{isPublic}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable("fileName") String fileName,
            @PathVariable boolean isPublic,
            Principal principal) {

        Resource resource =
                isPublic
                        ? fileStorageService.loadPublicFileAsResource(fileName)
                        : fileStorageService.loadPrivateFileAsResource(
                                fileName, principal.getName());

        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }
}
