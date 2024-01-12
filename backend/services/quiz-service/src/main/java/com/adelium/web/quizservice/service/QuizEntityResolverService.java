/* (C)2024 */
package com.adelium.web.quizservice.service;

import com.adelium.web.common.utility.EntityResolver;
import com.adelium.web.common.utility.RepositoryAndClassPair;
import com.adelium.web.quizservice.entity.bank.BankDefault;
import com.adelium.web.quizservice.entity.quiz.QuizDefault;
import com.adelium.web.quizservice.entity.quiz.QuizMCQ;
import com.adelium.web.quizservice.entity.quiz.QuizTrueFalse;
import com.adelium.web.quizservice.repository.bank.BankDefaultRepository;
import com.adelium.web.quizservice.repository.option.OptionMcqRepository;
import com.adelium.web.quizservice.repository.option.OptionTrueFalseRepository;
import com.adelium.web.quizservice.repository.question.QuestionMcqsRepository;
import com.adelium.web.quizservice.repository.question.QuestionTrueFalseRepository;
import com.adelium.web.quizservice.repository.quiz.QuizDefaultRepository;
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
            BankDefaultRepository bankDefaultRepository,
            QuizMCQRepository quizMCQRepository,
            QuizTrueFalseRepository quizTrueFalseRepository,
            QuizDefaultRepository quizDefaultRepository,
            QuestionTrueFalseRepository questionTrueFalseRepository,
            QuestionMcqsRepository questionMcqsRepository,
            OptionMcqRepository optionMcqRepository,
            OptionTrueFalseRepository optionTrueFalseRepository) {
        this.entityResolverMap = new HashMap<>();
        entityResolverMap.put(
                "bankDefaults",
                new RepositoryAndClassPair<>(bankDefaultRepository, BankDefault.class));
        entityResolverMap.put(
                "quizDefaults",
                new RepositoryAndClassPair<>(quizDefaultRepository, QuizDefault.class));
        entityResolverMap.put(
                "quizMcqs", new RepositoryAndClassPair<>(quizMCQRepository, QuizMCQ.class));
        entityResolverMap.put(
                "quizTrueFalses",
                new RepositoryAndClassPair<>(quizTrueFalseRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "questionTrueFalses",
                new RepositoryAndClassPair<>(questionTrueFalseRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "questionMcqs",
                new RepositoryAndClassPair<>(questionMcqsRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "optionMcqs",
                new RepositoryAndClassPair<>(optionMcqRepository, QuizTrueFalse.class));
        entityResolverMap.put(
                "optionTrueFalses",
                new RepositoryAndClassPair<>(optionTrueFalseRepository, QuizTrueFalse.class));
    }

    @Override
    public Optional<RepositoryAndClassPair<?>> resolveEntity(String entityName) {
        return Optional.ofNullable(entityResolverMap.get(entityName));
    }
}
