/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.*;
import org.springframework.security.core.authority.GrantedAuthoritiesContainer;

/**
 * Represents a role in the system.
 * Extends the BaseEntity class with a key of type Long.
 * Implements the GrantedAuthoritiesContainer interface from Spring Security.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Role extends BaseEntity<Long> implements GrantedAuthoritiesContainer {

    /**
     * Unique name of the role.
     */
    @Column(unique = true)
    private String name;

    /**
     * Authorities granted to this role.
     */
    @ManyToMany
    @JoinTable(
            name = "roles_authority",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    private Collection<Authority> grantedAuthorities;

    /**
     * List of users associated with this role.
     */
    @ManyToMany(mappedBy = "roles")
    @Builder.Default
    private List<User> users = new ArrayList<>();
}
