/* (C)2023 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.exception.UsernameAlreadyExistsException;
import com.adelium.web.authservice.service.AuthService;
import com.adelium.web.common.dto.UserAuthDTO;
import com.adelium.web.common.dto.UserDetailsDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
     * @param userDetailsDTO the user details
     * @return the response entity containing the generated tokens
     * @throws UsernameAlreadyExistsException if the username already exists
     */
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDetailsDTO userDetailsDTO) {
        try {
            TokensDTO tokens = service.register(userDetailsDTO);
            return ResponseEntity.ok(tokens);
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur interne du serveur");
        }
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<String> handleUsernameAlreadyExists(UsernameAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    /**
     * Authenticates a user and generates tokens.
     *
     * @param userAuthDTO the user authentication details
     * @return the response entity containing the generated tokens
     */
    @PostMapping("/login")
    public ResponseEntity<TokensDTO> login(@Valid @RequestBody UserAuthDTO userAuthDTO) {
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
