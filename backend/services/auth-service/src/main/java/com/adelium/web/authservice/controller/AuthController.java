/* (C)2023 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.dto.TokensDTO;
import com.adelium.web.authservice.exception.UsernameAlreadyExistsException;
import com.adelium.web.authservice.service.AuthService;
import com.adelium.web.common.dto.UserAuthDTO;
import com.adelium.web.common.dto.UserDetailsDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for authentication.
 * Defines endpoints for registering a new user, logging in, and refreshing the access token.
 *
 * @see AuthService
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

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
        if (service.isPresent(userDetailsDTO.getUsername())) {
            throw new UsernameAlreadyExistsException("Le nom d'utilisateur existe déjà.");
        }
        try {
            TokensDTO tokens = service.register(userDetailsDTO);
            logger.info("Nouvel utilisateur enregistré : {}", userDetailsDTO.getUsername());
            return ResponseEntity.ok(tokens);
        } catch (UsernameAlreadyExistsException e) {
            logger.error("Erreur lors de l'enregistrement d'un nouvel utilisateur", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Erreur interne du serveur", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur interne du serveur");
        }
    }

    /**
     * Handles UsernameAlreadyExistsException.
     *
     * @param e the exception
     * @return the response entity containing the error message
     */
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<String> handleUsernameAlreadyExists(UsernameAlreadyExistsException e) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    /**
     * Handles general exceptions.
     *
     * @param e the exception
     * @return the response entity containing the error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception e) {
        logger.error("Erreur interne du serveur", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur interne du serveur.");
    }

    /**
     * Authenticates a user and generates tokens.
     *
     * @param userAuthDTO the user authentication details
     * @return the response entity containing the generated tokens
     */
    @PostMapping("/login")
    public ResponseEntity<TokensDTO> login(@Valid @RequestBody UserAuthDTO userAuthDTO) {
        logger.info("Authentification de l'utilisateur : {}", userAuthDTO.getUsername());
        return ResponseEntity.ok(service.login(userAuthDTO));
    }

    /**
     * Handles validation exceptions.
     *
     * @param ex the exception
     * @return the response entity containing the error message
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage =
                ex.getBindingResult().getAllErrors().stream()
                        .map(ObjectError::getDefaultMessage)
                        .collect(Collectors.joining("; "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    /**
     * Handles data integrity violation exceptions.
     *
     * @param e the exception
     * @return the response entity containing the error message
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        if (e.getCause() instanceof ConstraintViolationException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Le nom d'utilisateur est déjà utilisé.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur interne du serveur.");
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
        // FIXME: it is possible to refresh the token even if the accessToken is not valid anymore
    }
}
