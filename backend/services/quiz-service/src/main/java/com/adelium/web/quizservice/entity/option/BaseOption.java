/* (C)2023 */
package com.adelium.web.quizservice.entity.option;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.option.Option;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * BaseOption is an abstract class that represents a basic implementation of the Option interface.
 * It provides common fields and methods for all Option implementations.
 * @param <O> the type of the option's original media
 * @param <E> the type of the option's edited media
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
@Entity(name = "option")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = OptionMCQ.class, name = "mcq"),
    @JsonSubTypes.Type(value = OptionTrueFalse.class, name = "true-false"),
})
public abstract class BaseOption<O extends Media, E extends Media> extends BaseEntity<Long>
        implements Option<O, E> {

    /**
     * Indicates whether the option is correct or not.
     */
    @Column(name = "is_correct")
    protected boolean correct;

    /**
     * Indicates whether the option is enabled or not.
     */
    @Column(name = "is_enabled")
    protected boolean enabled;

    @Override
    public boolean isCorrect() {
        return correct;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
