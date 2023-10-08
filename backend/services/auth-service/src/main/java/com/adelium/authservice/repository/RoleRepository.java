package com.adelium.authservice.repository;

import com.adelium.authservice.entity.Role;
import com.adelium.authservice.entity.User;
import com.adelium.common.model.BaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface RoleRepository extends BaseRepository<Role, Long> {
}
