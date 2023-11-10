/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.User;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 * This interface represents the User repository which extends the BaseRepository interface.
 * It provides methods to perform CRUD operations on User entities in the database.
 */
@Repository
@Transactional
public interface UserRepository extends BaseRepository<User, Long> {

    /**
     * Finds a user by its username.
     * @param username
     * @return
     */
    Optional<User> findByUsername(String username);
}
