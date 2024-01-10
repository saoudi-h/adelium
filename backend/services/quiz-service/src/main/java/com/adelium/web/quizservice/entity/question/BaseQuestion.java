/* (C)2023 */
package com.adelium.web.quizservice.entity.question;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import com.adelium.web.quizservice.core.tag.Tag;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base question entity.
 * It extends the BaseEntity class and implements the Question interface.
 *
 * @param <T> the type of media used in the question
 * @see BaseEntity
 * @see Question
 * @see Media
 * @see Tag
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity(name = "question")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = QuestionTrueFalse.class, name = "true-false"),
    @JsonSubTypes.Type(value = QuestionMCQ.class, name = "mcq")
})
public abstract class BaseQuestion<T extends Media> extends BaseEntity<Long>
        implements Question<T> {
    /**
     * The set of tags associated with this question.
     *
     * @see Tag
     */
    @ManyToMany
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    protected Set<Tag> tags;
}
