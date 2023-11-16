/* (C)2023 */
package com.adelium.web.quizservice.core.quiz;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.question.BaseQuestion;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This class represents a default quiz.
 * It extends the BaseQuiz class and implements the Quiz interface.
 *
 * @param <Q> the type of questions in the quiz
 * @param <M> the type of media associated with the questions
 * @see BaseQuiz
 * @see Quiz
 * @see BaseQuestion
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
public class QuizDefault extends BaseQuiz<BaseQuestion<BaseMedia>, BaseMedia> {

    @ManyToMany
    @JoinTable(
            name = "quiz_question",
            joinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private Set<BaseQuestion<BaseMedia>> questions;

    private static final String type = "default";

    @Override
    public String getType() {
        return type;
    }
}
