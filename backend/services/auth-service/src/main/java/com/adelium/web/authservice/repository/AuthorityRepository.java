/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Authority;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Authority entities.
 * <p>
 *     The @RepositoryRestResource annotation is used to customize the REST endpoint.
 *     It is used to change the path of the endpoint, and the name of the collection.
 *     The path is the part of the URL after the application name.
 * </p>
 *
 * @see BaseRepository
 * @see Authority
 */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "authorities", path = "authorities")
public interface AuthorityRepository extends BaseRepository<Authority, Long> {

    /**
     * Find an Authority entity by its name.
     *
     * @param authority the name of the Authority entity to find
     * @return an Optional Authority entity
     */
    Optional<Authority> findByAuthority(String authority);
}
