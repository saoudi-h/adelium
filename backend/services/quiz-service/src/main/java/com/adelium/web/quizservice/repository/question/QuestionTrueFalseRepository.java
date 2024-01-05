/* (C)2024 */
package com.adelium.web.quizservice.repository.question;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.question.QuestionTrueFalse;
import jakarta.transaction.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "questionTrueFalses", path = "question-true-falses")
public interface QuestionTrueFalseRepository extends BaseRepository<QuestionTrueFalse, Long> {}
