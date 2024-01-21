/* (C)2023 */
package com.adelium.web.quizservice.repository.quiz;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.quiz.QuizMCQ;
import com.adelium.web.quizservice.entity.quiz.QuizTrueFalse;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This interface represents a repository for the QuizMCQ entity.
 * It extends the BaseRepository interface.
 *
 * @see BaseRepository
 * @see QuizMCQ
 */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "quizzesTrueFalse", path = "quiz_true_false")
public interface QuizTrueFalseRepository extends BaseRepository<QuizTrueFalse, Long> {

    /**
     * This method finds a True or False quiz by its name.
     *
     * @param name the name of the True or False quiz to find
     * @return an Optional of the True or False quiz found
     */
    Optional<QuizTrueFalse> findByName(@Param("name") String name);
}
