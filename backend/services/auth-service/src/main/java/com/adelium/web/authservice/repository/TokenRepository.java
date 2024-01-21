/* (C)2023 */
package com.adelium.web.authservice.repository;

import com.adelium.web.authservice.entity.Token;
import com.adelium.web.common.repository.BaseRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface TokenRepository extends BaseRepository<Token, Long> {

    /**
     * Finds all valid tokens for a given user.
     *
     * @param id the user id
     * @return the list of valid tokens
     */
    @Query(
            value =
                    """
                            select t from Token t inner join User u\s
                            on t.user.id = u.id\s
                            where u.id = :id and (t.expired = false or t.revoked = false)\s
                            """)
    List<Token> findAllValidTokenByUser(Long id);

    /**
     * Finds a token by its token value.
     *
     * @param token
     * @return
     */
    Optional<Token> findByToken(String token);

    /**
     * Finds all valid access tokens for a given user.
     *
     * @param id the user id
     * @return the list of valid tokens
     */
    @Query(
            value =
                    """
                            select t from Token t inner join User u\s
                            on t.user.id = u.id\s
                            where u.id = :id and t.refreshToken != null and (t.expired = false or t.revoked = false)\s
                            and t.tokenType = 'BEARER'\s
                            """)
    List<Token> findAllValidAccessTokenByUser(Long id);
}
