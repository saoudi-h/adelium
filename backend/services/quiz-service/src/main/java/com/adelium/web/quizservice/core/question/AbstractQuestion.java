/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.tag.Tag;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * This class represents a question in the quiz service.
 * It extends the BaseEntity class and implements the Question interface.
 * It contains a set of Tag objects and methods for getting/setting the tags.
 */
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public abstract class AbstractQuestion extends BaseEntity<Long> {
    /**
     * The set of tags associated with this question.
     */
    @ManyToMany
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    protected Set<Tag> tags;
}
