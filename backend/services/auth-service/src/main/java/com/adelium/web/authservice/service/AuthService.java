/* (C)2023 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.Token;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.exception.RoleNotFoundException;
import com.adelium.web.authservice.exception.UsernameAlreadyExistsException;
import com.adelium.web.authservice.mapper.UserDetailsMapper;
import com.adelium.web.authservice.repository.RoleRepository;
import com.adelium.web.authservice.repository.TokenRepository;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.dto.TokenType;
import com.adelium.web.common.dto.UserAuthDTO;
import com.adelium.web.common.dto.UserDetailsDTO;
import com.adelium.web.common.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UserDetailsMapper userDetailsMapper;
    private final TokenService tokenService;
    private final RoleRepository roleRepository;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    /**
     * Registers a new user.
     *
     * @param userDetailsDTO the user details
     * @return the response entity containing the generated tokens
     * @throws UsernameAlreadyExistsException if the username already exists
     */
    public TokensDTO register(UserDetailsDTO userDetailsDTO) {
        Role userRole =
                roleRepository
                        .findByName("ROLE_USER")
                        .orElseThrow(() -> new RoleNotFoundException("Role USER not found"));
        var user = userDetailsMapper.toEntity(userDetailsDTO);
        user.setRoles(Set.of(userRole));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAvatar(
                userService.getGravatar(
                        user.getUsername(), user.getFirstname(), user.getLastname()));
        try {
            var savedUser = userRepository.save(user);
            var jwtToken = tokenService.generateToken(user);
            var jwtRefreshToken = tokenService.generateRefreshToken(user);
            var refreshToken = saveRefreshToken(savedUser, jwtRefreshToken);
            saveUserToken(savedUser, jwtToken, refreshToken);
            logger.info("Nouvel utilisateur enregistré : {}", userDetailsDTO.getUsername());
            return TokensDTO.builder().accessToken(jwtToken).refreshToken(jwtRefreshToken).build();
        } catch (DataIntegrityViolationException e) {
            logger.error("Erreur lors de l'enregistrement d'un nouvel utilisateur", e);
            throw new UsernameAlreadyExistsException("Le nom d'utilisateur existe déjà.");
        } catch (RoleNotFoundException e) {
            logger.error("Erreur lors de l'enregistrement d'un nouvel utilisateur", e);
            throw new RuntimeException("Erreur interne du serveur 1");
        } catch (Exception e) {
            logger.error("Erreur interne du serveur", e);
            throw new RuntimeException("Erreur interne du serveur 2");
        }
    }

    /**
     * Saves the user token.
     *
     * @param user     the user
     * @param jwtToken the JWT token to save
     */
    public void saveUserToken(User user, String jwtToken, Token refreshToken) {
        var token =
                Token.builder()
                        .user(user)
                        .token(jwtToken)
                        .refreshToken(refreshToken)
                        .tokenType(TokenType.BEARER)
                        .expired(false)
                        .revoked(false)
                        .build();
        tokenRepository.save(token);
    }

    public Token saveRefreshToken(User user, String refreshToken) {
        var token =
                Token.builder()
                        .user(user)
                        .token(refreshToken)
                        .tokenType(TokenType.BEARER)
                        .expired(false)
                        .revoked(false)
                        .build();
        tokenRepository.save(token);
        return token;
    }

    /**
     * Authenticates a user and generates tokens.
     *
     * @param userAuthDTO the user authentication details
     * @return the response entity containing the generated tokens
     */
    public TokensDTO login(UserAuthDTO userAuthDTO) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userAuthDTO.getUsername(), userAuthDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        var user =
                userRepository
                        .findByUsername(userAuthDTO.getUsername())
                        .orElseThrow(() -> new UsernameNotFoundException("User not founded."));

        var jwtToken = tokenService.generateToken(user);

        var jwtRefreshToken = tokenService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        var refreshToken = saveRefreshToken(user, jwtRefreshToken);
        saveUserToken(user, jwtToken, refreshToken);
        return TokensDTO.builder().accessToken(jwtToken).refreshToken(jwtRefreshToken).build();
    }

    /**
     * Revokes all user tokens.
     *
     * @param user the user
     */
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

    private void revokeAllUserAccessTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidAccessTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) return;
        validUserTokens.forEach(
                token -> {
                    token.setExpired(true);
                    token.setRevoked(true);
                });
        tokenRepository.saveAll(validUserTokens);
    }

    /**
     * Refreshes the access token.
     *
     * @param request  the HTTP servlet request
     * @param response the HTTP servlet response
     * @throws IOException if an I/O error occurs
     */
    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED, "Invalid Authorization header format.");
            return;
        }

        final String jwtRefreshToken = authHeader.substring(7);
        final String username = jwtService.extractUsername(jwtRefreshToken);

        if (username == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid refresh token.");
            return;
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null
                || !jwtService.isRefreshValid(jwtRefreshToken, userDetailsMapper.toDTO(user))) {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired refresh token.");
            return;
        }

        try {
            var accessToken = tokenService.generateToken(user);
            revokeAllUserAccessTokens(user);
            var refreshToken = tokenRepository.findByToken(jwtRefreshToken).orElse(null);
            saveUserToken(user, accessToken, refreshToken);

            var authResponse =
                    TokensDTO.builder()
                            .accessToken(accessToken)
                            .refreshToken(jwtRefreshToken)
                            .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
        } catch (Exception e) {
            response.sendError(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error generating access token.");
        }
    }

    public boolean isPresent(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
