/* (C)2023 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.dto.AuthenticationRequest;
import com.adelium.web.authservice.dto.AuthenticationResponse;
import com.adelium.web.authservice.dto.RegisterRequest;
import com.adelium.web.authservice.dto.TokenType;
import com.adelium.web.authservice.entity.Token;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.repository.TokenRepository;
import com.adelium.web.authservice.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user =
                User.builder()
                        .username(request.getUsername())
                        .firstname(request.getFirstname())
                        .lastname(request.getLastname())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .roles(request.getRoles())
                        .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token =
                Token.builder()
                        .user(user)
                        .token(jwtToken)
                        .tokenType(TokenType.BEARER)
                        .expired(false)
                        .revoked(false)
                        .build();
        tokenRepository.save(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()));

        var user =
                userRepository
                        .findByUsername(request.getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not founded."));

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) return;
        validUserTokens.forEach(
                token -> {
                    token.setExpired(true);
                    token.setRevoked(true);
                });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null) {
            var user = userRepository.findByUsername(username).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse =
                        AuthenticationResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
