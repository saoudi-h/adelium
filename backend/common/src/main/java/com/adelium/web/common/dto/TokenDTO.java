/* (C)2023 */
package com.adelium.web.common.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TokenDTO extends BaseDTO<Long> {

    @NotBlank(message = "Token is mandatory")
    public String token;

    @NotBlank(message = "Token type is mandatory")
    public TokenType tokenType = TokenType.BEARER;

    public boolean revoked;
    public boolean expired;
}
