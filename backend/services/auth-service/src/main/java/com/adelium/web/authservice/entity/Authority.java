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

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Authority extends BaseEntity<Long> implements GrantedAuthority {

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "grantedAuthorities")
    private Collection<Role> roles = new HashSet<>();

    @Override
    public String getAuthority() {
        return getName();
    }
}
