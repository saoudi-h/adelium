/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.User;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This interface represents a repository for the User entity.
 * It extends the BaseRepository interface.
 * It also contains a method to find a user by its username.
 * <p>
 * The @RepositoryRestResource annotation is used to customize the REST endpoint.
 * It is used to change the path of the endpoint, and the name of the collection.
 * The path is the part of the URL after the application name.
 * </p>
 *
 * @see BaseRepository
 * @see User
 */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends BaseRepository<User, Long> {

    /**
     * Finds a user by its username.
     *
     * @param username the username of the user to find
     * @return an Optional containing the user if found, or an empty Optional otherwise
     */
    Optional<User> findByUsername(@Param("username") String username);
}
