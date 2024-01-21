/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import java.util.Collection;
import java.util.HashSet;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

/**
 * Represents an authority that can be granted to a user.
 * This class implements the Spring Security {@link GrantedAuthority} interface.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Authority extends BaseEntity<Long> implements GrantedAuthority {

    /**
     * The name of the authority.
     * This name is used by Spring Security to check if a user has this authority.
     */
    @Column(nullable = false)
    private String authority;

    /**
     * The roles that are granted this authority.
     */
    @ManyToMany(mappedBy = "grantedAuthorities")
    @Builder.Default
    private Collection<Role> roles = new HashSet<>();

    @Override
    public String toString() {
        return authority;
    }
}
