/* (C)2023 */
package com.adelium.web.quizservice.repository.quiz;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.quiz.QuizDefault;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This interface represents a repository for the QuizDefault entity.
 * It extends the BaseRepository interface.
 *
 * @see BaseRepository
 * @see QuizDefault
 *
 * */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "quizzesDefault", path = "quiz_default")
public interface QuizDefaultRepository extends BaseRepository<QuizDefault, Long> {

    Optional<QuizDefault> findByName(String name);
}
