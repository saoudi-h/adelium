/* (C)2023 */
package com.adelium.web.quizservice.core.quiz;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base quiz entity.
 * It extends the BaseEntity class and implements the Quiz interface.
 *
 * @param <Q> the type of questions in the quiz
 * @param <M> the type of media associated with the questions
 * @see BaseEntity
 * @see Quiz
 * @see Question
 * @see Media
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity(name = "quiz")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseQuiz<Q extends Question<M>, M extends Media> extends BaseEntity<Long>
        implements Quiz<Q, M> {

    @Column(unique = true)
    private String name;

    @Column private String description;

    @Column private boolean enabled;

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
