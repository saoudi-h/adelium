/* (C)2023 */
package com.adelium.web.quizservice.entity.question;

import com.adelium.web.quizservice.core.evaluation.Evaluation;
import com.adelium.web.quizservice.entity.media.BaseMedia;
import com.adelium.web.quizservice.core.question.Optionable;
import com.adelium.web.quizservice.entity.media.MediaText;
import com.adelium.web.quizservice.entity.option.OptionTrueFalse;
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
public class QuestionTrueFalse extends BaseQuestion<BaseMedia>
        implements Optionable<OptionTrueFalse, BaseMedia, MediaText> {

    /**
     * The number of options of the question.
     */
    @Column private int numberOfOptions;

    /**
     * The media content representing the question.
     */
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "content_media_id", referencedColumnName = "id")
//    @JsonDeserialize(using = MediaDeserializer.class)
    private BaseMedia content;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<OptionTrueFalse> options;

    /**
     * Is the question enabled?
     */
    private boolean enabled;

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Column @Builder.Default private String type = "true-false";

    @Override
    public Evaluation assess(MediaText userAnswer) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'assess'");
    }
}
