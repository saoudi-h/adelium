/* (C)2023 */
package com.adelium.web.quizservice.repository.bank;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.bank.BankDefault;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This interface represents a repository for the BankDefault entity.
 * It extends the BaseRepository interface.
 *
 * @see BaseRepository
 * @see BankDefault
 */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "banksDefault", path = "banks_default")
public interface BankDefaultRepository extends BaseRepository<BankDefault, Long> {

    /**
     * This method finds a bank by its name.
     *
     * @param name the name of the bank to find
     * @return an Optional of the bank found
     */
    Optional<BankDefault> findByName(String name);
}
