/* (C)2023 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.mapper.UserDetailsMapper;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.dto.UserDetailsDTO;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    /**
     * Return the avatar of the user.
     * from Gravatar if exists, from ui-avatars.com otherwise
     *
     * @param email     the email of the user
     * @param firstname the firstname of the user
     * @param lastname  the lastname of the user
     * @return the avatar of the user, null if an error occurs
     * @see <a href="https://fr.gravatar.com/">Gravatar</a>
     * @see <a href="https://ui-avatars.com/">ui-avatars.com</a>
     */
    public String getGravatar(String email, String firstname, String lastname) {
        try {
            String trimmedEmail = email.trim().toLowerCase();

            MessageDigest md = MessageDigest.getInstance("SHA-256");

            md.update(trimmedEmail.getBytes());

            byte[] bytes = md.digest();

            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            String encodedName =
                    URLEncoder.encode(firstname + ' ' + lastname, StandardCharsets.UTF_8);

            return String.format(
                    "https://www.gravatar.com/avatar/%s?d=%s",
                    sb.toString(),
                    URLEncoder.encode(
                            "https://ui-avatars.com/api/" + encodedName + "/" + 128,
                            StandardCharsets.UTF_8));

        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }
}
