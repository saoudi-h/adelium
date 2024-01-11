/* (C)2023 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.mapper.UserDetailsMapper;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.dto.UserDetailsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for user details.
 *
 * @see UserRepository
 * @see UserDetailsMapper
 */
@RepositoryRestController("/users")
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
    @GetMapping("/by-username/{username}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable String username) {
        return userRepository
                .findByUsername(username)
                .map(userDetailsMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
