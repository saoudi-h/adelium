/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Represents a user in the system.
 * Extends the BaseEntity class with a key of type Long.
 * Implements the UserDetails interface from Spring Security.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class User extends BaseEntity<Long> implements UserDetails {

    /**
     * The username of the user.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * The password of the user.
     */
    @Column(nullable = false)
    private String password;

    /**
     * The first name of the user.
     */
    @Column(nullable = false)
    private String firstname;

    /**
     * The last name of the user.
     */
    @Column(nullable = false)
    private String lastname;

    /**
     * Is the user account expired?
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean accountNonExpired = true;

    /**
     * Is the user account locked?
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean accountNonLocked = true;

    /**
     * Are the user credentials expired?
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean credentialsNonExpired = true;

    /**
     * Is the user enabled?
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;

    /**
     * The roles of the user.
     */
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    /**
     * The tokens of the user.
     */
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private List<Token> tokens;

    /**
     * Returns the authorities granted to the user.
     * This method is required by the {@link UserDetails} interface.
     *
     * @return the authorities granted to the user
     */
    @Override
    public Collection<Authority> getAuthorities() {
        Set<Authority> authorities = new HashSet<>();
        for (Role role : roles) {
            authorities.addAll(role.getGrantedAuthorities());
        }
        return authorities;
    }
}
