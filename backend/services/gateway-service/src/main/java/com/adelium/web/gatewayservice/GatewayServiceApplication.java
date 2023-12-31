/* (C)2023 */
package com.adelium.web.gatewayservice;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import jakarta.ws.rs.HttpMethod;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@OpenAPIDefinition(
        info =
                @Info(
                        title = "Gateway service",
                        version = "1.0",
                        description = "Documentation Gateway service v1.0"))
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(
                        r ->
                                r.path("/auth-docs/v3/api-docs")
                                        .and()
                                        .method(HttpMethod.GET)
                                        .uri("lb://auth-service"))
                .route(
                        r ->
                                r.path("/quiz-docs/v3/api-docs")
                                        .and()
                                        .method(HttpMethod.GET)
                                        .uri("lb://quiz-service"))
                .route(
                        r ->
                                r.path("/media-docs/v3/api-docs")
                                        .and()
                                        .method(HttpMethod.GET)
                                        .uri("lb://media-service"))
                .build();
    }
}
