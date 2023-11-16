/* (C)2023 */
package com.adelium.web.common.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base entity.
 *
 * @param <ID> the type of the entity's ID
 */
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public abstract class BaseEntity<ID extends Serializable> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected ID id;
}
