/* (C)2023 */
package com.adelium.web.quizservice.entity.quiz;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import com.adelium.web.quizservice.core.quiz.Quiz;
import com.adelium.web.quizservice.core.tag.Tag;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
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
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = QuizDefault.class, name = "default"),
    @JsonSubTypes.Type(value = QuizTrueFalse.class, name = "true-false"),
    @JsonSubTypes.Type(value = QuizMCQ.class, name = "mcq"),
})
public abstract class BaseQuiz<Q extends Question<M>, M extends Media> extends BaseEntity<Long>
        implements Quiz<Q, M> {

    @Column(unique = true)
    private String name;

    @Column private String description;

    @Column(nullable = false)
    private String imageUrl;

    @Column @Builder.Default private boolean enabled = false;

    @Column @Builder.Default private boolean isPublic = false;

    @Column(nullable = false)
    private Long ownerId;

    @ManyToMany
    @JoinTable(
            name = "quiz_tag",
            joinColumns = @JoinColumn(name = "quiz_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags;

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
