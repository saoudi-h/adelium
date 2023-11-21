/* (C)2023 */
package com.adelium.web.common.security;

import com.adelium.web.common.client.AuthServiceClient;
import com.adelium.web.common.dto.UserDetailsDTO;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JwtAuthFilter is a custom security filter that extends OncePerRequestFilter,
 * ensuring
 * it's applied once per request within a single request thread. It's
 * responsible for
 * intercepting HTTP requests and handling JWT-based authentication.
 */
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final AuthServiceClient authServiceClient;

    /**
     * Custom filter logic for JWT authentication.
     *
     * @param request     The incoming HttpServletRequest.
     * @param response    The outgoing HttpServletResponse.
     * @param filterChain The filter chain provided by the Spring security filter
     *                    chain.
     * @throws ServletException if a servlet-specific error occurs.
     * @throws IOException      if an I/O error occurs during request processing.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }
        // TODO: try final String jwtToken = authHeader.split(" ")[1].trim();
        jwtToken = authHeader.substring(7);
        username = jwtService.extractUsername(jwtToken);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // user not connected
            UserDetailsDTO userDetails = getUserDetails(username);

            if (userDetails != null && jwtService.isTokenValid(jwtToken, userDetails)) {
                Claims claims = jwtService.extractAllClaims(jwtToken);
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, claims, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Retrieves user details from the authentication service based on the username.
     *
     * @param username The username to retrieve user details for.
     * @return UserDetailsDTO object containing user details.
     */
    protected UserDetailsDTO getUserDetails(String username) {
        return authServiceClient.getUser(username).getBody();
    }
}
