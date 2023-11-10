/* (C)2023 */
package com.adelium.web.quizservice.core.option;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.entity.question.QuestionTrueFalse;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Represents a true/false answer for a quiz question.
 * Extends the AbstractAnswer class and overrides the isEnable method to always return false.
 * Includes a ManyToOne relationship with the QuestionTrueFalse class.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
public class OptionTrueFalse extends AbstractOption {

    @OneToOne
    @JoinColumn(name = "media_id")
    private Media explanation;

    private static final String type = "true_false";

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private QuestionTrueFalse question;

    @Override
    public String getType() {
        return type;
    }
}
