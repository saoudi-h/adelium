/* (C)2023 */
package com.adelium.web.quizservice.core.bank;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import com.adelium.web.quizservice.core.tag.Tag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This abstract class represents a base bank entity.
 * It extends the BaseEntity class and implements the Bank interface.
 *
 * @param <Q> the type of questions in the bank
 * @param <M> the type of media associated with the questions
 * @see BaseEntity
 * @see Bank
 * @see Question
 * @see Media
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
@Entity(name = "bank")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseBank<Q extends Question<M>, M extends Media> extends BaseEntity<Long>
        implements Bank<Q, M> {

    @ManyToMany
    @JoinTable(
            name = "bank_tag",
            joinColumns = @JoinColumn(name = "bank_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags;

    @Column(unique = true)
    private String name;

    @Column private String description;

    @Column private boolean enabled = false;

    @Column private boolean isPublic = false;

    @Column(nullable = false)
    private Long ownerId;
}
