/* (C)2023 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.dto.RegisterRequest;
import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.service.AuthService;
import com.adelium.web.common.dto.UserAuthDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The controller for the authentication service.
 *
 * <p>It contains the endpoints for registering, authenticating and refreshing tokens.</p>
 */
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping(value = "/register")
    public ResponseEntity<TokensDTO> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<TokensDTO> login(@RequestBody UserAuthDTO userAuthDTO) {
        return ResponseEntity.ok(service.login(userAuthDTO));
    }

    @PostMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        service.refreshToken(request, response);
    }
}
