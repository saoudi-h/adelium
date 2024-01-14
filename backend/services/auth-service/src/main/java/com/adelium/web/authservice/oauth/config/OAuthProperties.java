/* (C)2024 */
package com.adelium.web.authservice.oauth.config;

import java.util.HashMap;
import java.util.Map;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "spring.security.oauth2.client")
public class OAuthProperties {
    private final Map<String, Registration> registration = new HashMap<>();
    private final Map<String, Provider> provider = new HashMap<>();
}
