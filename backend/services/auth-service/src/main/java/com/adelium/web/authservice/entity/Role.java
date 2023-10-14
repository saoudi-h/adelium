/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Role extends BaseEntity<Long> implements GrantedAuthority {
    @Column(nullable = false, unique = true)
    private String authority;

    @ManyToMany(mappedBy = "authorities")
    @Builder.Default
    private List<User> users = new ArrayList<>();
}
