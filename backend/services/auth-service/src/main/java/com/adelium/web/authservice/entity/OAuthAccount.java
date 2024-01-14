/* (C)2024 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"oAuthId", "provider"})})
public class OAuthAccount extends BaseEntity<Long> {

    @Column(name = "oauth_id")
    private String oAuthId;

    private String provider;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
}
