/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Authority;
import com.adelium.web.common.repository.BaseRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface AuthorityRepository extends BaseRepository<Authority, Long> {

    Optional<Authority> findByName(String name);
}
