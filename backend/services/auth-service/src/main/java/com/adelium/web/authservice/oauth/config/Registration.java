/* (C)2024 */
package com.adelium.web.authservice.oauth.config;

import lombok.Data;

@Data
public class Registration {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String scope;
}
