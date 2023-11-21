/* (C)2023 */
package com.adelium.web.quizservice.repository.quiz;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.quiz.QuizMCQ;
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
 *
 * */
@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "quizzesMQS", path = "quiz-mcq")
public interface QuizMCQRepository extends BaseRepository<QuizMCQ, Long> {

    /**
     * This method finds a MCQ quiz by its name.
     *
     * @param name the name of the MCQ quiz to find
     * @return an Optional of the MCQ quiz found
     */
    Optional<QuizMCQ> findByName(@Param("name") String name);
}
