/* (C)2023 */
package com.adelium.web.authservice.entity;

import static org.assertj.core.api.Assertions.*;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserTests {

    public void createUserTest() {
        User user = new User();
        user.setUsername("username");
        user.setEmail("username@adelium.com");
        user.setPassword("password");

        assertThat(user.getUsername()).isEqualTo("username");
        assertThat(user.getEmail()).isEqualTo("username@adelium.com");
        assertThat(user.getPassword()).isEqualTo("password");
    }
}
