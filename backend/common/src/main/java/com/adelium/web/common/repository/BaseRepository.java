/* (C)2023 */
package com.adelium.web.common.repository;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.transaction.Transactional;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * This interface represents the Base repository which extends the JpaRepository interface.
 * It provides methods to perform CRUD operations on Base entities in the database.
 *
 * @param <Model> the type of the model
 * @param <ID> the type of the model's ID
 * @see JpaRepository
 * @see BaseEntity
 */
@NoRepositoryBean
@Transactional
public interface BaseRepository<Model extends BaseEntity<ID>, ID extends Serializable>
        extends JpaRepository<Model, ID> {}
