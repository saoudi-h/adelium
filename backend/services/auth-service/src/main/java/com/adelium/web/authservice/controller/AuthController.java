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
 * Controller class for authentication.
 * Defines endpoints for registering a new user, logging in, and refreshing the access token.
 *
 * @see AuthService
 */
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    /**
     * Registers a new user.
     *
     * @param request the register request containing user details
     * @return the response entity containing the generated tokens
     */
    @PostMapping(value = "/register")
    public ResponseEntity<TokensDTO> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    /**
     * Authenticates a user and generates tokens.
     *
     * @param userAuthDTO the user authentication details
     * @return the response entity containing the generated tokens
     */
    @PostMapping("/login")
    public ResponseEntity<TokensDTO> login(@RequestBody UserAuthDTO userAuthDTO) {
        return ResponseEntity.ok(service.login(userAuthDTO));
    }

    /**
     * Refreshes the access token.
     *
     * @param request  the HTTP servlet request
     * @param response the HTTP servlet response
     * @throws IOException if an I/O error occurs
     */
    @PostMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        service.refreshToken(request, response);
    }
}
