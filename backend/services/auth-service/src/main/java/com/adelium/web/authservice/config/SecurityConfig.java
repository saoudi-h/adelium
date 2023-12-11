/* (C)2023 */
package com.adelium.web.authservice.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.adelium.web.common.security.ForbiddenHandler;
import com.adelium.web.common.security.UnauthorizedHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

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

    private final LogoutHandler logoutHandler;
    private final AuthenticationProvider authenticationProvider;
    private final UnauthorizedHandler unauthorizedHandler;
    private final ForbiddenHandler forbiddenHandler;
    private static final String[] ADMIN_URL = {
        "/roles/**", "/authorities/**", "/authorisations/**",
    };

    private static final String[] AUTH_URL = {
        "/logout", "/refresh", "/users/**",
    };

    private static final String[] WHITE_LIST_URL = {
        "/actuator",
        "/actuator/**",
        "/auth-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs/**",
        "/swagger-resources/**",
    };

    private static final String[] ANONYMOUS_URL = {
        "/login", "/register",
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter)
            throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                //                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        (exception) ->
                                exception
                                        .authenticationEntryPoint(unauthorizedHandler)
                                        .accessDeniedHandler(forbiddenHandler))
                .authorizeHttpRequests(
                        (requests) ->
                                requests
                                        // whitelist no permission needed
                                        .requestMatchers(WHITE_LIST_URL)
                                        .permitAll()
                                        .requestMatchers(AUTH_URL)
                                        .authenticated()
                                        // admin routes should have admin role
                                        .requestMatchers(ADMIN_URL)
                                        .hasRole("ADMIN")
                                        .requestMatchers(HttpMethod.POST, ANONYMOUS_URL)
                                        .anonymous()
                                        // not in white list routes should be authenticated
                                        .anyRequest()
                                        .authenticated())
                .logout(
                        logout ->
                                logout.logoutUrl("/auth/logout")
                                        .addLogoutHandler(logoutHandler)
                                        .logoutSuccessHandler(
                                                (request, response, authentication) ->
                                                        SecurityContextHolder.clearContext()));
        return http.build();
    }
}
