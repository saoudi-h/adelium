/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Token;
import com.adelium.web.common.repository.BaseRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends BaseRepository<Token, Long> {

    @Query(
            value =
                    """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);
}
