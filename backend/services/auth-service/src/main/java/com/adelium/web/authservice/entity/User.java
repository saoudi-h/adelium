/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.*;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * This class represents a user of the application.
 * <p>
 * A user has a username, a password, a first name, a last name, a set of roles
 * and a set of tokens.
 * </p>
 *
 * @see Role
 * @see Token
 * @see UserDetails
 * @see BaseEntity
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class User extends BaseEntity<Long> implements UserDetails {

    @Column(nullable = false, unique = true)
    private String username;

    /**
     * The password of the user.
     */
    @Column(nullable = true)
    @JsonIgnore
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
     * The Phone number of the user.
     */
    @Column(nullable = false)
    @Builder.Default
    private String phone = "0000000000";

    /**
     * Is the user account expired?
     * meaning that the user cannot log in.
     * This is used to disable user accounts after a certain amount of time.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean accountNonExpired = true;

    /**
     * Is the user account locked?
     * meaning that the user cannot log in.
     * This is used to lock the user account after a number of failed login attempts.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean accountNonLocked = true;

    /**
     * The number of failed login attempts of the user.
     * This is used to lock the user account after a number of failed login attempts.
     */
    @Column(nullable = false)
    @Builder.Default
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int failedLoginAttempts = 0;

    /**
     * The date of the last failed login attempt of the user.
     * This is used to lock the user account after a number of failed login attempts.
     */
    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Date lockTime;

    /**
     * The date of the last successful login attempt of the user.
     */
    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Date lastFailedLoginTime;

    /**
     * Are the user credentials expired?
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean credentialsNonExpired = true;

    /**
     * Is the user enabled?
     * meaning that the user can log in.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;

    /**
     * Is the user verified?
     * meaning that the user has verified his email address.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean isVerified = false;

    /**
     * The reset password token of the user.
     * This token is used to reset the user password.
     * It is generated when the user requests a password reset.
     * It is sent to the user email address.
     * It is valid for a certain amount of time.
     * It is deleted when the user resets his password.
     */
    @Column(nullable = true)
    @JsonIgnore
    private String resetPasswordToken;

    /**
     * The reset password token expiry date of the user.
     * This token is used to reset the user password.
     * It is generated when the user requests a password reset.
     * It is sent to the user email address.
     * It is valid for a certain amount of time.
     * It is deleted when the user resets his password.
     */
    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Date resetPasswordTokenExpiry;

    /**
     * The roles of the user.
     *
     * @see Role
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    /**
     * The tokens of the user.
     *
     * @see Token
     */
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    @Builder.Default
    @JsonIgnore
    private Set<Token> tokens = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    @Builder.Default
    @JsonIgnore
    private Set<OAuthAccount> oAuthAccounts = new HashSet<>();

    /**
     * The address of the user.
     *
     * @see Address
     */
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = true)
    private Address address;

    /**
     * The avatar of the user.
     * Url generated from Gravatar if exists, from ui-avatars.com otherwise
     */
    @Column(nullable = true)
    private String avatar;

    @Column(nullable = false)
    @Builder.Default
    private boolean isOAuthAccount = false;

    /**
     * The date of creation of the user.
     */
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;

    /**
     * The date of the last update of the user.
     */
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;

    /**
     * On creation, set the date of creation and the date of the last update of the user.
     *
     * @see PrePersist
     */
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    /**
     * Updates the date of the last update of the user.
     *
     * @see PreUpdate
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    /**
     * Returns the authorities granted to the user.
     * This method is required by the {@link UserDetails} interface.
     *
     * @return the authorities granted to the user
     */
    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Set<Authority> getAuthorities() {
        Set<Authority> authorities = new HashSet<>();
        for (Role role : roles) {
            authorities.add(Authority.builder().authority(role.getName()).build());
            authorities.addAll(role.getGrantedAuthorities());
        }
        return authorities;
    }

    @Override
    public String toString() {
        return username;
    }
}
