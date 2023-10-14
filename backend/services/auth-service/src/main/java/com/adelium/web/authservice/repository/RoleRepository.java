/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Role;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface RoleRepository extends BaseRepository<Role, Long> {}
