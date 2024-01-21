/* (C)2023 */
package com.adelium.web.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserDetailsDTO extends BaseDTO<Long> implements UserDetails {
    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "First name is mandatory")
    private String firstname;

    @NotBlank(message = "Last name is mandatory")
    private String lastname;

    @NotBlank(message = "Phone number is mandatory")
    private String phone;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Builder.Default private boolean accountNonExpired = true;
    @Builder.Default private boolean accountNonLocked = true;
    @Builder.Default private boolean credentialsNonExpired = true;
    @Builder.Default private boolean enabled = true;

    // @NotEmpty(message = "Authorities must not be empty")
    // @Valid
    private Set<RoleDTO> roles;

    // @JsonIgnore
    // @Valid
    private Set<TokenDTO> tokens;

    @Override
    public Collection<AuthorityDTO> getAuthorities() {
        Set<AuthorityDTO> authorities = new HashSet<>();
        for (RoleDTO role : roles) {
            authorities.add(new AuthorityDTO(role.getName()));
            authorities.addAll(role.getGrantedAuthorities());
        }
        return authorities;
    }

    @Override
    public String toString() {
        return "UserDetailsDTO{"
                + "username='"
                + username
                + '\''
                + ", password='"
                + password
                + '\''
                + ", accountNonExpired="
                + accountNonExpired
                + ", accountNonLocked="
                + accountNonLocked
                + ", credentialsNonExpired="
                + credentialsNonExpired
                + ", enabled="
                + enabled
                + ", roles="
                + roles
                + ", tokens="
                + tokens
                + '}';
    }
}
