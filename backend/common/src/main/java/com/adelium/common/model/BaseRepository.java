package com.adelium.common.model;

import com.adelium.common.entity.BaseEntity;
import jakarta.transaction.Transactional;
import lombok.experimental.SuperBuilder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@NoRepositoryBean
@Transactional

public interface BaseRepository<Model extends BaseEntity<T>, T extends Serializable> extends CrudRepository<Model, T> {

}
