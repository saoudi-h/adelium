/* (C)2023 */
package com.adelium.web.common.security;

import com.adelium.web.common.client.AuthServiceClient;
import com.adelium.web.common.dto.UserDetailsDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JwtAuthFilter is a custom security filter that extends OncePerRequestFilter,
 * ensuring
 * it's applied once per request within a single request thread. It's
 * responsible for
 * intercepting HTTP requests and handling JWT-based authentication.
 */
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final AuthServiceClient authServiceClient;

    private final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

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

        logger.info("request url : " + request.getRequestURL().toString());
        logger.info("doFilterInternal");
        final String authHeader = request.getHeader("Authorization");
        try {
            logger.info("authHeader : " + authHeader);
            if (isAuthService() && request.getRequestURI().startsWith(getAuthenticationsUrl())) {
                logger.info("isAuthService");
                filterChain.doFilter(request, response);
                return;
            }
            if (authHeader == null || !authHeader.startsWith("Bearer")) {
                logger.info("authHeader null or not starts with Bearer");
                filterChain.doFilter(request, response);
                return;
            }
            final String jwtToken = authHeader.split(" ")[1].trim();
            final String username = jwtService.extractUsername(jwtToken);
            logger.info("username : " + username);

            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {
                logger.info("SecurityContextHolder.getContext().getAuthentication() == null");
                // user not connected
                System.out.println("before getting user details");
                logger.info("before getting user details");
                UserDetailsDTO userDetails = getUserDetails(username);
                logger.info("userDetails : " + userDetails);
                logger.info("after getting user details");
                System.out.println("after getting user details");

                if (userDetails != null && jwtService.isTokenValid(jwtToken, userDetails)) {
                    logger.info("userDetails != null && jwtService.isTokenValid");
                    Claims claims = jwtService.extractAllClaims(jwtToken);
                    logger.info("claims : " + claims);
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, claims, userDetails.getAuthorities());
                    logger.info("authToken : " + authToken);
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));
                    logger.info("authToken : " + authToken);
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    logger.error(
                            "Erreur lors de l'authentification d'un utilisateur : Token JWT"
                                    + " invalide. username : "
                                    + username);
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token JWT invalide");
                    return;
                }
            }
        } catch (ExpiredJwtException e) {
            logger.error("Erreur d'authentification d'un utilisateur : Token JWT expiré", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Le Token JWT est expiré");
            return;
        } catch (MalformedJwtException e) {
            logger.error("Erreur d'authentification d'un utilisateur : Token JWT malformé", e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Le Token JWT est malformé");
            return;
        } catch (JwtException e) {
            logger.error("Erreur d'authentification d'un utilisateur : Erreur de Token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Erreur de Token JWT");
            return;
        } catch (Exception e) {
            logger.error(
                    "Erreur d'authentification d'un utilisateur : Erreur interne du serveur", e);
            response.sendError(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erreur interne du serveur");
            return;
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

    protected boolean isAuthService() {
        return false;
    }

    protected String getAuthenticationsUrl() {
        return "/auth/";
    }
}
