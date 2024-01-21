/* (C)2023 */
package com.adelium.web.mediaservice.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for customizing OpenAPI documentation.
 */
@OpenAPIDefinition
@Configuration
public class OpenApiConfigs {

    /**
     * Configures custom OpenAPI documentation.
     *
     * @param serviceTitle   the title of the service
     * @param serviceVersion the version of the service
     * @param url            the URL of the service
     * @return the custom OpenAPI configuration
     */
    @Bean
    public OpenAPI customOpenAPI(
            @Value("${openapi.service.title}") String serviceTitle,
            @Value("${openapi.service.version}") String serviceVersion,
            @Value("${openapi.service.url}") String url) {
        return new OpenAPI()
                .servers(List.of(new Server().url(url)))
                .info(new Info().title(serviceTitle).version(serviceVersion));
    }
}
