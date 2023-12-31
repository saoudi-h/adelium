/* (C)2023 */
package com.adelium.web.mediaservice.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.adelium.web.common.security.ForbiddenHandler;
import com.adelium.web.common.security.JwtFilter;
import com.adelium.web.common.security.UnauthorizedHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for Spring Security.
 * Defines a filter chain for authenticating requests using JWT tokens.
 * Defines a filter chain for logging out.
 * Defines a filter chain for authorizing requests.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UnauthorizedHandler unauthorizedHandler;
    private final ForbiddenHandler forbiddenHandler;

    private static final String[] WHITE_LIST_URL = {
        "/files/true/**",
        "/actuator",
        "/actuator/**",
        "/media-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs/**",
        "/swagger-resources/**",
    };

    private static final String[] ADMIN_URLS = {};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(
                        (exception) ->
                                exception
                                        .authenticationEntryPoint(unauthorizedHandler)
                                        .accessDeniedHandler(forbiddenHandler))
                .authorizeHttpRequests(
                        (requests) ->
                                requests.requestMatchers(WHITE_LIST_URL)
                                        .permitAll()
                                        .requestMatchers(ADMIN_URLS)
                                        .hasRole("ADMIN")
                                        .anyRequest()
                                        .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
