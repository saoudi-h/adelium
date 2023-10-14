/* (C)2023 */
package com.adelium.web.common.repository;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.transaction.Transactional;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
@Transactional
public interface BaseRepository<Model extends BaseEntity<ID>, ID extends Serializable>
        extends JpaRepository<Model, ID> {}
