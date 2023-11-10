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
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Authority extends BaseEntity<Long> implements GrantedAuthority {

    /**
     * The name of the authority.
     */
    @Column(nullable = false)
    private String name;

    /**
     * The roles that are granted this authority.
     */
    @ManyToMany(mappedBy = "grantedAuthorities")
    @Builder.Default
    private Collection<Role> roles = new HashSet<>();

    /**
     * Returns the name of the authority.
     * This method is required by the {@link GrantedAuthority} interface.
     *
     * @return the name of the authority
     */
    @Override
    public String getAuthority() {
        return getName();
    }
}
