/* (C)2024 */
package com.adelium.web.quizservice.repository.question;

import com.adelium.web.common.repository.BaseRepository;
import com.adelium.web.quizservice.entity.question.QuestionMCQ;
import jakarta.transaction.Transactional;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@RepositoryRestResource(collectionResourceRel = "questionMcqs", path = "question-mcqs")
public interface QuestionMcqsRepository extends BaseRepository<QuestionMCQ, Long> {}
