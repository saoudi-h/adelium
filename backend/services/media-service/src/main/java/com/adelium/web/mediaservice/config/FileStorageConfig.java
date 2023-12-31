/* (C)2023 */
package com.adelium.web.mediaservice.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class FileStorageConfig {
    @Value("${file.storage-location.public}")
    private String publicDirectory;

    @Value("${file.storage-location.private}")
    private String privateDirectory;
}
