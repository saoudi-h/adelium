/* (C)2023 */
package com.adelium.web.common.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base entity.
 *
 * @param <ID> the type of the entity's ID
 */
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public abstract class BaseEntity<ID extends Serializable> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected ID id;
}
