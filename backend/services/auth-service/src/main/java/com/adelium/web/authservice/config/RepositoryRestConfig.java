/* (C)2023 */
package com.adelium.web.authservice.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * This class is responsible for configuring the Spring Data REST repository for the all entities.
 * It exposes the IDs of the entities in the REST API.
 *
 * @see RepositoryRestConfigurer
 * @see RepositoryRestConfiguration
 * @see Configuration
 * @see EntityManager
 * @see Type
 */
@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {

    @Autowired private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration config, CorsRegistry cors) {
        Class[] classes =
                entityManager.getMetamodel().getEntities().stream()
                        .map(Type::getJavaType)
                        .toArray(Class[]::new);
        config.exposeIdsFor(classes);
    }
}
