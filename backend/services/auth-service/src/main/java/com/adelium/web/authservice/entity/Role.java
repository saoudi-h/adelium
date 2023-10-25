/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.*;
import org.springframework.security.core.authority.GrantedAuthoritiesContainer;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Role extends BaseEntity<Long> implements GrantedAuthoritiesContainer {

    @Column(unique = true)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "roles_authority",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    private Collection<Authority> grantedAuthorities;

    @ManyToMany(mappedBy = "roles")
    @Builder.Default
    private List<User> users = new ArrayList<>();
}
