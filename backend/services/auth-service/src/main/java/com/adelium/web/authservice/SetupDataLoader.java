/* (C)2023 */
package com.adelium.web.authservice;

import com.adelium.web.authservice.entity.Authority;
import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.repository.AuthorityRepository;
import com.adelium.web.authservice.repository.RoleRepository;
import com.adelium.web.authservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired private UserRepository userRepository;

    @Autowired private RoleRepository roleRepository;

    @Autowired private AuthorityRepository authorityRepository;

    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup) return;
        Authority readAuthority = createAuthorityIfNotFound("READ_PRIVILEGE");
        Authority writeAuthority = createAuthorityIfNotFound("WRITE_PRIVILEGE");

        createRoleIfNotFound("ROLE_ADMIN", Arrays.asList(readAuthority, writeAuthority));
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readAuthority));

        Role adminRole = null;

        try {
            adminRole =
                    roleRepository
                            .findByName("ROLE_ADMIN")
                            .orElseThrow(() -> new Exception("ROLE_ADMIN should exist."));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        User user = new User();
        user.setUsername("admin@adelium.com");
        user.setFirstname("hakim");
        user.setLastname("saoudi");
        user.setPassword(passwordEncoder.encode("password"));
        user.getRoles().add(adminRole);
        user.setEnabled(true);
        userRepository.save(user);
        alreadySetup = true;
    }

    @Transactional
    public Authority createAuthorityIfNotFound(String name) {

        Optional<Authority> optionalAuthority = authorityRepository.findByName(name);
        Authority authority = null;
        if (optionalAuthority.isEmpty()) {
            authority = Authority.builder().name(name).build();
            authorityRepository.save(authority);
        } else {
            authority = optionalAuthority.get();
        }
        return authority;
    }

    @Transactional
    public Role createRoleIfNotFound(String name, Collection<Authority> authorities) {

        Optional<Role> optionalRole = roleRepository.findByName(name);
        Role role = null;
        if (optionalRole.isEmpty()) {
            role = Role.builder().name(name).grantedAuthorities(authorities).build();
            roleRepository.save(role);
        } else {
            role = optionalRole.get();
        }
        return role;
    }
}
