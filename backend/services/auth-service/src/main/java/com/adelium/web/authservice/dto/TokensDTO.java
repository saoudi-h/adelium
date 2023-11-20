/* (C)2023 */
package com.adelium.web.authservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a response for authentication, containing an access token and a refresh token.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokensDTO {
    @JsonProperty("accessToken")
    private String accessToken;

    @JsonProperty("refreshToken")
    private String refreshToken;
}
