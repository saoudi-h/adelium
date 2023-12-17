/* (C)2023 */
package com.adelium.web.authservice.config;

import com.adelium.web.authservice.service.UserService;
import com.adelium.web.common.client.AuthServiceClient;
import com.adelium.web.common.dto.UserDetailsDTO;
import com.adelium.web.common.security.JwtFilter;
import com.adelium.web.common.security.JwtService;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthFilter extends JwtFilter {

    private final UserService userService;

    public JwtAuthFilter(
            JwtService jwtService, AuthServiceClient authServiceClient, UserService userService) {
        super(jwtService, null);
        this.userService = userService;
    }

    @Override
    protected UserDetailsDTO getUserDetails(String username) {
        return userService.loadUserByUsername(username);
    }

    @Override
    protected boolean isAuthService() {
        return true;
    }

    @Override
    protected String getAuthenticationsUrl() {
        return "/auth";
    }
}
