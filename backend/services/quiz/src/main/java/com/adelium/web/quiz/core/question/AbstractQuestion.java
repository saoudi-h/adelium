/* (C)2023 */
package com.adelium.web.quiz.core.question;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public abstract class AbstractQuestion extends BaseEntity<Long> implements Question {
    @ManyToMany
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    protected Set<Tag> tags;
}
