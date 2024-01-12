/* (C)2024 */
package com.adelium.web.authservice.service;

import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.repository.AuthorityRepository;
import com.adelium.web.authservice.repository.RoleRepository;
import com.adelium.web.authservice.repository.UserRepository;
import com.adelium.web.common.utility.EntityResolver;
import com.adelium.web.common.utility.RepositoryAndClassPair;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class AuthEntityResolverService implements EntityResolver {

    private final Map<String, RepositoryAndClassPair<?>> entityResolverMap;

    public AuthEntityResolverService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            AuthorityRepository authorityRepository) {
        this.entityResolverMap = new HashMap<>();
        entityResolverMap.put("users", new RepositoryAndClassPair<>(userRepository, User.class));
        entityResolverMap.put("roles", new RepositoryAndClassPair<>(roleRepository, Role.class));
        entityResolverMap.put(
                "authorities", new RepositoryAndClassPair<>(authorityRepository, Role.class));
    }

    @Override
    public Optional<RepositoryAndClassPair<?>> resolveEntity(String entityName) {
        return Optional.ofNullable(entityResolverMap.get(entityName));
    }
}
