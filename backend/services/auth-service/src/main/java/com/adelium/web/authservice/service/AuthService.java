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

    /**
     * Registers a new user.
     *
     * @param userDetailsDTO the user details
     * @return the response entity containing the generated tokens
     * @throws UsernameAlreadyExistsException if the username already exists
     * @throws Exception                      if an error occurs
     */
    public TokensDTO register(UserDetailsDTO userDetailsDTO) {
        Role userRole =
                roleRepository
                        .findByName("ROLE_USER")
                        .orElseThrow(() -> new RoleNotFoundException("Role USER not found"));
        var user = userDetailsMapper.toEntity(userDetailsDTO);
        user.setRoles(Set.of(userRole));
        try {
            var savedUser = userRepository.save(user);
            var jwtToken = tokenService.generateToken(user);
            var refreshToken = tokenService.generateRefreshToken(user);
            saveUserToken(savedUser, jwtToken);
            return TokensDTO.builder().accessToken(jwtToken).refreshToken(refreshToken).build();
        } catch (DataIntegrityViolationException e) {
            throw new UsernameAlreadyExistsException("Le nom d'utilisateur existe déjà.");
        } catch (RoleNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erreur interne du serveur 2");
        }
    }

    /**
     * Saves the user token.
     *
     * @param user    the user
     * @param jwtToken the JWT token to save
     */
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

        var refreshToken = tokenService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return TokensDTO.builder().accessToken(jwtToken).refreshToken(refreshToken).build();
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
        final String refreshToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid refresh token");
            return;
        }

        refreshToken = authHeader.substring(7);

        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null
                    && jwtService.isTokenValid(refreshToken, userDetailsMapper.toDTO(user))) {
                System.out.println("login user: " + user);
                var accessToken = tokenService.generateToken(user);
                System.out.println("access token: " + accessToken);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse =
                        TokensDTO.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
