/* (C)2023 */
package com.adelium.web.quizservice.entity.question;

import com.adelium.web.quizservice.core.evaluation.Evaluation;
import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.question.BaseQuestion;
import com.adelium.web.quizservice.core.question.Optionable;
import com.adelium.web.quizservice.deserializer.MediaDeserializer;
import com.adelium.web.quizservice.entity.media.MediaText;
import com.adelium.web.quizservice.entity.option.OptionMCQ;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Represents a multiple choice quiz question.
 * <p>
 *     Extends the AbstractQuestion class and implements the Propositional interface.
 *     It is a generic class, with the type of the options as a parameter.
 *     It is also a JPA entity.
 * </p>
 *
 * @see BaseQuestion
 * @see Optionable
 * @see OptionMCQ
 * @see BaseMedia
 * @see MediaText
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity(name = "question_mcq")
public class QuestionMCQ extends BaseQuestion<BaseMedia>
        implements Optionable<OptionMCQ, BaseMedia, MediaText> {

    /**
     * The number of options of the question.
     */
    @Column private int numberOfOptions;

    /**
     * The media content representing the question.
     */
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "media_id")
    @JsonDeserialize(using = MediaDeserializer.class)
    private BaseMedia content;

    @OneToMany(mappedBy = "question")
    private Set<OptionMCQ> options;

    /**
     * Is the question enabled?
     */
    private boolean enabled;

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Column @Builder.Default private String type = "mcq";

    @Override
    public Evaluation assess(MediaText userAnswer) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'assess'");
    }
}
