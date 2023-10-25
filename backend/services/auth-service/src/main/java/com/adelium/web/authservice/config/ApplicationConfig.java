/* (C)2023 */
package com.adelium.web.authservice.config;

import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.repository.UserRepository;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username ->
                userRepository
                        .findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public Set<Role> adminGroup() {
        Set<Role> roles = new HashSet<>();
        roles.add(Role.builder().name("ROLE_ADMIN").build());
        // Ajoutez d'autres roles ici
        return roles;
    }

    @Bean
    public Set<Role> businessGroup() {
        Set<Role> roles = new HashSet<>();
        roles.add(Role.builder().name("ROLE_BUSINESS").build());
        return roles;
    }

    @Bean
    public Set<Role> registerGroup() {
        Set<Role> roles = new HashSet<>();
        roles.add(Role.builder().name("ROLE_REGISTER").build());
        return roles;
    }

    @Bean
    public Set<Role> internGroup() {
        Set<Role> roles = new HashSet<>();
        roles.add(Role.builder().name("ROLE_INTERN").build());
        return roles;
    }
}
