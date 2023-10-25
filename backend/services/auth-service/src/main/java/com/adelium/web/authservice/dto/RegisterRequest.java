/* (C)2023 */
package com.adelium.web.authservice.dto;

import com.adelium.web.authservice.entity.Role;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
