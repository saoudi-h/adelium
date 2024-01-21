/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.dto.TokenType;
import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a token entity that can be used for authentication and authorization purposes.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token extends BaseEntity<Long> {

    /**
     * The token value.
     */
    @Column(length = 1024, unique = true)
    public String token;

    /**
     * The type of the token.
     */
    @Enumerated(EnumType.STRING)
    @Builder.Default
    public TokenType tokenType = TokenType.BEARER;

    /**
     * The time to live of the token in seconds.
     */
    public boolean revoked;

    /**
     * The time to live of the token in seconds.
     */
    public boolean expired;

    @ManyToOne
    @JoinColumn(name = "refresh_token_id")
    private Token refreshToken;

    /**
     * The time to live of the token in seconds.
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
