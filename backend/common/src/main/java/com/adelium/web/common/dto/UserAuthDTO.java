/* (C)2023 */
package com.adelium.web.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAuthDTO extends BaseDTO<Long> {
    @NotBlank(message = "Username is mandatory")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
