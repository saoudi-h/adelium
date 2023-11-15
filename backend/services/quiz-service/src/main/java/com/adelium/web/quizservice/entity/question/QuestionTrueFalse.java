/* (C)2023 */
package com.adelium.web.quizservice.entity.question;

import com.adelium.web.quizservice.core.evaluation.Evaluation;
import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.media.MediaText;
import com.adelium.web.quizservice.core.option.OptionTrueFalse;
import com.adelium.web.quizservice.core.question.AbstractQuestion;
import com.adelium.web.quizservice.core.question.Optionable;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Represents a true/false quiz question.
 *
 * Extends the AbstractQuestion class and implements the Propositional interface.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity(name = "question_true_false")
public class QuestionTrueFalse extends AbstractQuestion
        implements Optionable<OptionTrueFalse, BaseMedia, MediaText> {

    /**
     * The number of options of the question.
     */
    @Column private int numberOfOptions;

    /**
     * The media content representing the question.
     */
    @OneToOne
    @JoinColumn(name = "media_id")
    private BaseMedia content;

    private static final String type = "true_false";

    @OneToMany(mappedBy = "question")
    private Set<OptionTrueFalse> options;

    /**
     * Is the question enabled?
     */
    private boolean enabled;

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getType() {
        return type;
    }

    @Override
    public Evaluation assess(MediaText userAnswer) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'assess'");
    }
}
