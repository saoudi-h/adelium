/* (C)2023 */
package com.adelium.web.common.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class AuthorityDTO extends BaseDTO<Long> implements GrantedAuthority {

    @NotBlank(message = "Authority must not be blank")
    private String authority;
}
