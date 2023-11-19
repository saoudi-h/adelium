/* (C)2023 */
package com.adelium.web.common.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.authority.GrantedAuthoritiesContainer;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class RoleDTO extends BaseDTO<Long> implements GrantedAuthoritiesContainer {
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotEmpty(message = "Granted authorities must not be empty")
    @Valid
    private Set<AuthorityDTO> grantedAuthorities;
}
