/* (C)2023 */
package com.adelium.web.common.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthorityDTO extends BaseDTO<Long> implements GrantedAuthority {

    @NotBlank(message = "Authority must not be blank")
    private String authority;

    @Override
    public String toString() {
        return "AuthorityDTO{" + "authority='" + authority + '\'' + '}';
    }
}
