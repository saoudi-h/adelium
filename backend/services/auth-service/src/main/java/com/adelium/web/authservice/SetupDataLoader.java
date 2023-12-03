/* (C)2023 */
package com.adelium.web.authservice;

import com.adelium.web.authservice.entity.Address;
import com.adelium.web.authservice.entity.Authority;
import com.adelium.web.authservice.entity.Role;
import com.adelium.web.authservice.entity.User;
import com.adelium.web.authservice.repository.AuthorityRepository;
import com.adelium.web.authservice.repository.RoleRepository;
import com.adelium.web.authservice.repository.UserRepository;
import com.github.javafaker.Faker;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * This class is responsible for loading initial data into the database when the application starts.
 * It implements ApplicationListener to listen to the ContextRefreshedEvent event.
 * It creates default roles, authorities, and a user with admin privileges if they do not exist in the database.
 *
 * @see ApplicationListener
 * @see ContextRefreshedEvent
 * @see Component
 */
@Component
@Profile("dev")
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final AuthorityRepository authorityRepository;

    private final PasswordEncoder passwordEncoder;

    private final Faker faker = new Faker();

    /**
     * This method is called when the application starts.
     * It creates default roles, authorities, and a user with admin privileges if they do not exist in the database.
     *
     * @param event The ContextRefreshedEvent event.
     */
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

        // Create admin user
        createUser("admin@adelium.com", "hakim", "saoudi", "0123456789", "password", adminRole);

        // Create 100 users
        for (int i = 0; i < 100; i++) {
            createUser(
                    faker.internet().emailAddress(),
                    faker.name().firstName(),
                    faker.name().lastName(),
                    faker.phoneNumber().phoneNumber(),
                    "password",
                    adminRole);
        }

        alreadySetup = true;
    }

    private void createUser(
            String email,
            String firstname,
            String lastname,
            String phone,
            String password,
            Role role) {
        User user = new User();
        user.setUsername(email);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(password));
        user.getRoles().add(role);
        user.setEnabled(true);
        user.setAddress(
                Address.builder()
                        .streetNumber(faker.address().streetAddressNumber())
                        .street(faker.address().streetName())
                        .postalCode(faker.address().zipCode())
                        .city(faker.address().city())
                        .country(faker.address().country())
                        .build());
        userRepository.save(user);
    }

    /**
     * This method creates an authority if it does not exist in the database.
     *
     * @param name The name of the authority.
     * @return The authority.
     */
    @Transactional
    public Authority createAuthorityIfNotFound(String name) {

        Optional<Authority> optionalAuthority = authorityRepository.findByAuthority(name);
        Authority authority = null;
        if (optionalAuthority.isEmpty()) {
            authority = Authority.builder().authority(name).build();
            authorityRepository.save(authority);
        } else {
            authority = optionalAuthority.get();
        }
        return authority;
    }

    /**
     * This method creates a role if it does not exist in the database.
     *
     * @param name        The name of the role.
     * @param authorities The authorities of the role.
     * @return The role.
     */
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
