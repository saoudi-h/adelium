/* (C)2024 */
package com.adelium.web.authservice.oauth.config;

import java.util.HashMap;
import java.util.Map;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(OAuthProperties.class)
public class OAuthProviderConfigurations {

    private final OAuthProperties oauthProperties;

    public OAuthProviderConfigurations(OAuthProperties oauthProperties) {
        this.oauthProperties = oauthProperties;
    }

    @Bean
    public Map<String, ProviderConfig> providerConfigs() {
        Map<String, ProviderConfig> config = new HashMap<>();
        for (String providerKey : oauthProperties.getProvider().keySet()) {
            Provider provider = oauthProperties.getProvider().get(providerKey);
            Registration registration = oauthProperties.getRegistration().get(providerKey);

            ProviderConfig providerConfig = new ProviderConfig();
            providerConfig.setProvider(provider);
            providerConfig.setRegistration(registration);
            providerConfig.setName(providerKey);

            config.put(providerKey, providerConfig);
        }
        return config;
    }
}
