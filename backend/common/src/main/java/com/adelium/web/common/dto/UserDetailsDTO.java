/* (C)2023 */
package com.adelium.web.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.userdetails.UserDetails;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class UserDetailsDTO extends BaseDTO<Long> implements UserDetails {
    @NotBlank(message = "Username is mandatory")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;

    //    @NotEmpty(message = "Authorities must not be empty")
    //    @Valid
    private Set<RoleDTO> roles;

    @JsonIgnore @Valid private List<TokenDTO> tokens;

    @Override
    public Collection<AuthorityDTO> getAuthorities() {
        Set<AuthorityDTO> authorities = new HashSet<>();
        for (RoleDTO role : roles) {
            authorities.addAll(role.getGrantedAuthorities());
        }
        return authorities;
    }
}
