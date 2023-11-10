/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Role;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Role entities.
 */
@Repository
@Transactional
public interface RoleRepository extends BaseRepository<Role, Long> {
    /**
     * Finds a Role entity by its name.
     *
     * @param name the name of the Role entity to find
     * @return an Optional containing the Role entity, or an empty Optional if not found
     */
    Optional<Role> findByName(String name);
}
