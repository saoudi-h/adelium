/* (C)2023 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.mapper.UserDetailsMapper;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.dto.UserDetailsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controller class for user details.
 *
 * @see UserRepository
 * @see UserDetailsMapper
 */
@RepositoryRestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserDetailsMapper userDetailsMapper;

    /**
     * Retrieves the user details for the given username.
     *
     * @param username the username of the user
     * @return the ResponseEntity containing the UserDetailsDTO
     */
    @GetMapping("/users/{username}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable String username) {
        return ResponseEntity.ok(
                userDetailsMapper.toDTO(userRepository.findByUsername(username).orElse(null)));
    }
}
