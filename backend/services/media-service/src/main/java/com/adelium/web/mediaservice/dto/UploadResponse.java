/* (C)2024 */
package com.adelium.web.mediaservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Upload response DTO.
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UploadResponse {
    private String url;
}
