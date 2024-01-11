/* (C)2024 */
package com.adelium.web.quizservice.service;

import com.adelium.web.common.utility.EntityResolver;
import com.adelium.web.common.utility.RepositoryAndClassPair;
import com.adelium.web.quizservice.entity.quiz.QuizMCQ;
import com.adelium.web.quizservice.entity.quiz.QuizTrueFalse;
import com.adelium.web.quizservice.repository.option.OptionMcqRepository;
import com.adelium.web.quizservice.repository.option.OptionTrueFalseRepository;
import com.adelium.web.quizservice.repository.question.QuestionMcqsRepository;
import com.adelium.web.quizservice.repository.question.QuestionTrueFalseRepository;
import com.adelium.web.quizservice.repository.quiz.QuizMCQRepository;
import com.adelium.web.quizservice.repository.quiz.QuizTrueFalseRepository;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class QuizEntityResolverService implements EntityResolver {

    private final Map<String, RepositoryAndClassPair<?>> entityResolverMap;

    public QuizEntityResolverService(
            QuizMCQRepository quizMCQRepository,
            QuizTrueFalseRepository quizTrueFalseRepository,
            QuestionTrueFalseRepository questionTrueFalseRepository,
            QuestionMcqsRepository questionMcqsRepository,
            OptionMcqRepository optionMcqRepository,
            OptionTrueFalseRepository optionTrueFalseRepository) {
        this.entityResolverMap = new HashMap<>();
        entityResolverMap.put(
                "quiz-mcqs", new RepositoryAndClassPair<>(quizMCQRepository, QuizMCQ.class));
        entityResolverMap.put(
                "quiz-true-falses",
                new RepositoryAndClassPair<>(quizTrueFalseRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "question-true-falses",
                new RepositoryAndClassPair<>(questionTrueFalseRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "question-mcqs",
                new RepositoryAndClassPair<>(questionMcqsRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "option-mcqs",
                new RepositoryAndClassPair<>(optionMcqRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "option-true-falses",
                new RepositoryAndClassPair<>(optionTrueFalseRepository, QuizTrueFalse.class));
    }

    @Override
    public Optional<RepositoryAndClassPair<?>> resolveEntity(String entityName) {
        return Optional.ofNullable(entityResolverMap.get(entityName));
    }
}
