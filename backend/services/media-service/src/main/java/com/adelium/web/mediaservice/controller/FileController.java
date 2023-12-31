/* (C)2023 */
package com.adelium.web.mediaservice.controller;

import com.adelium.web.mediaservice.service.FileStorageService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload/{isPublic}")
    public ResponseEntity<String> uploadPublicFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable boolean isPublic,
            Principal principal) {
        String fileName = fileStorageService.storeFile(file, isPublic, principal.getName());
        return ResponseEntity.ok(fileName);
    }

    @GetMapping("/{isPublic}/{fileName:.+}")
    public ResponseEntity<Resource> downloadPublicFile(
            @PathVariable String fileName, @PathVariable boolean isPublic, Principal principal) {

        Resource resource =
                fileStorageService.loadFileAsResource(fileName, isPublic, principal.getName());

        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }
}
