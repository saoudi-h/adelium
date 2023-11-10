/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Authority;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 * This interface represents the Authority repository which extends the BaseRepository interface.
 * It provides methods to perform CRUD operations on Authority entities in the database.
 */
@Repository
@Transactional
public interface AuthorityRepository extends BaseRepository<Authority, Long> {

    /**
     * Finds an Authority entity by its name.
     *
     * @param name the name of the Authority entity to find
     * @return an Optional containing the Authority entity with the given name, or an empty Optional if not found
     */
    Optional<Authority> findByName(String name);
}
