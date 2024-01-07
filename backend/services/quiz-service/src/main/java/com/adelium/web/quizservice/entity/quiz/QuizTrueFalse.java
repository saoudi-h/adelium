/* (C)2023 */
package com.adelium.web.quizservice.entity.quiz;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.question.BaseQuestion;
import com.adelium.web.quizservice.core.quiz.BaseQuiz;
import com.adelium.web.quizservice.core.quiz.Quiz;
import com.adelium.web.quizservice.entity.question.QuestionTrueFalse;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * This class represents a MCQ quiz.
 * It extends the BaseQuiz class and implements the Quiz interface.
 *
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
public class QuizTrueFalse extends BaseQuiz<QuestionTrueFalse, BaseMedia> {

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "quiz_question",
            joinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private Set<QuestionTrueFalse> questions;

    @Column @Builder.Default private String type = "true-false";
}
