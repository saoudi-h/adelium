/* (C)2023 */
package com.adelium.web.authservice.config;

import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.repository.UserRepository;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * This class is responsible for configuring the Spring Data REST repository for the User entity.
 * It configures the entity lookup to use the username instead of the ID.
 *
 * @see User
 * @see UserRepository
 * @see RepositoryRestConfigurer
 * @see RepositoryRestConfiguration
 * @see Component
 */
@Component
public class UserEntityLookup implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration config, CorsRegistry cors) {
        config.withEntityLookup()
                .forRepository(UserRepository.class)
                .withIdMapping(User::getUsername)
                .withLookup(UserRepository::findByUsername);
    }
}
