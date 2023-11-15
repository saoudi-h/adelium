/* (C)2023 */
package com.adelium.web.quizservice.core.tag;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

/**
 * Represents a tag that can be assigned to a question.
 * @see BaseEntity
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Tag extends BaseEntity<Long> {

    /**
     * The name of the tag.
     */
    @Column(unique = true)
    String name;
}
