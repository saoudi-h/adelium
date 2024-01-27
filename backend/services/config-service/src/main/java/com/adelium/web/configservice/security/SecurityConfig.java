/* (C)2024 */
package com.adelium.web.configservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(
                        csrf ->
                                csrf.ignoringRequestMatchers(
                                        "/actuator/**", "/encrypt/**", "/decrypt/**"))
                .authorizeHttpRequests(
                        authorize ->
                                authorize
                                        .requestMatchers("/actuator/**")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
