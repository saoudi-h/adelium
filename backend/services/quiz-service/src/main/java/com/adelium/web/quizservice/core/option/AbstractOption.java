/* (C)2023 */
package com.adelium.web.quizservice.core.option;

import com.adelium.web.common.entity.BaseEntity;
import com.adelium.web.quizservice.core.media.Media;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * This is an abstract class that represents an option for a quiz question.
 * It extends the BaseEntity class and implements the Option interface.
 */
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
public abstract class AbstractOption extends BaseEntity<Long> implements Option {

    /**
     * The content or value of the option.
     */
    @OneToOne
    @JoinColumn(name = "media_id")
    private Media content;

    /**
     * Indicates whether the option is correct or not.
     */
    @Column(name = "is_correct")
    private boolean correct;

    /**
     * Indicates whether the option is enabled or not.
     */
    @Column(name = "is_enabled")
    private boolean enabled;

    @Override
    public Media getExplanation() {
        return content;
    }

    @Override
    public void setExplanation(Media explanation) {
        this.content = explanation;
    }

    @Override
    public boolean isCorrect() {
        return correct;
    }

    @Override
    public boolean isEnable() {
        return enabled;
    }

    @Override
    public String getType() {
        // Implement this method in concrete option classes
        return null;
    }
}
