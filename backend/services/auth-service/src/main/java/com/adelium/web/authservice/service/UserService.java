/* (C)2023 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.mapper.UserDetailsMapper;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.dto.UserDetailsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserDetailsMapper userDetailsMapper;

    @Override
    public UserDetailsDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDetailsMapper.toDTO(
                userRepository
                        .findByUsername(username)
                        .orElseThrow(
                                () ->
                                        new UsernameNotFoundException(
                                                "User with username: "
                                                        + username
                                                        + " not found.")));
    }
}
