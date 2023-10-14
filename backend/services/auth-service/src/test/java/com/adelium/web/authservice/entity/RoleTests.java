package com.adelium.web.authservice.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class RoleTests {

    @Test
    public void createRoleTest(){
        Role role = new Role();
        role.setAuthority("ROLE_USER");

        Assertions.assertNotNull(role);
        Assertions.assertEquals(role.getAuthority(),"ROLE_USER");
    }
}
