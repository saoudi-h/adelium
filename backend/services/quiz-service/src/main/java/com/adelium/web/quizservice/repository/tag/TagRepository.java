/* (C)2023 */
package com.adelium.web.quizservice.repository.tag;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.core.tag.Tag;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This interface represents a repository for the Tag entity.
 * It extends the BaseRepository interface.
 *
 * @see BaseRepository
 * @see Tag
 */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "tags", path = "tags")
public interface TagRepository extends BaseRepository<Tag, Long> {
    Optional<Tag> findByName(@Param("name") String name);
}
