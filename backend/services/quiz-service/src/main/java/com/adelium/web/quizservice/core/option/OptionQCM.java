/* (C)2023 */
package com.adelium.web.quizservice.core.option;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.entity.question.QuestionTrueFalse;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Represents a true/false answer for a quiz question.
 * Extends the AbstractAnswer class and overrides the isEnable method to always
 * return false.
 * Includes a ManyToOne relationship with the QuestionTrueFalse class.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity(name = "option_qcm")
public class OptionQCM extends BaseOption<BaseMedia, BaseMedia> {

    private static final String type = "qcm";

    /**
     * The media content representing the option.
     */
    @OneToOne
    @JoinColumn(name = "explanation_media_id")
    protected BaseMedia explanation;

    @OneToOne
    @JoinColumn(name = "content_media_id", referencedColumnName = "id")
    private BaseMedia content;

    @ManyToOne
    @JoinColumn(name = "question_true_false_id", referencedColumnName = "id")
    private QuestionTrueFalse question;

    @Override
    public String getType() {
        return type;
    }

    @Override
    public BaseMedia getContent() {
        return content;
    }
}
