/* (C)2023 */
package com.adelium.web.authservice.dto;

import com.adelium.web.authservice.entity.Role;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a request for registering a new user, containing an email, a username, a first name, a last name and a
 * password.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private Set<Role> roles;
}
