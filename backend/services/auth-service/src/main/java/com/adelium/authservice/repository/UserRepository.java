package com.adelium.authservice.repository;

import com.adelium.authservice.entity.User;
import com.adelium.common.repository.BaseRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends BaseRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
