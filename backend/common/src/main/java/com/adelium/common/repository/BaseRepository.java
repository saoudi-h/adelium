package com.adelium.common.repository;

import com.adelium.common.entity.BaseEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
@Transactional
public interface BaseRepository<Model extends BaseEntity<ID>, ID extends Serializable> extends JpaRepository<Model, ID> {

}
