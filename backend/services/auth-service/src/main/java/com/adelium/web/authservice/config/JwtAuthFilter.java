/* (C)2023 */
package com.adelium.web.authservice.config;

import com.adelium.web.authservice.service.AuthService;
import com.adelium.web.common.client.AuthServiceClient;
import com.adelium.web.common.dto.UserDetailsDTO;
import com.adelium.web.common.security.JwtFilter;
import com.adelium.web.common.security.JwtService;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthFilter extends JwtFilter {
    private final AuthService authService;

    public JwtAuthFilter(
            JwtService jwtService, AuthServiceClient authServiceClient, AuthService authService) {
        super(jwtService, null);
        this.authService = authService;
    }

    @Override
    protected UserDetailsDTO getUserDetails(String username) {
        return authService.loadUserByUsername(username);
    }
}
