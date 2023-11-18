/* (C)2023 */
package com.adelium.web.quizservice.entity.option;

import com.adelium.web.quizservice.core.media.MediaBoolean;
import com.adelium.web.quizservice.core.media.MediaText;
import com.adelium.web.quizservice.core.option.BaseOption;
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
@Entity
public class OptionTrueFalse extends BaseOption<MediaBoolean, MediaText> {

    private static final String type = "true_false";

    /**
     * The media content representing the option.
     */
    @OneToOne
    @JoinColumn(name = "explanation_text_media_id")
    protected MediaText explanation;

    @OneToOne
    @JoinColumn(name = "content_boolean_media_id", referencedColumnName = "id")
    private MediaBoolean content;

    @ManyToOne
    @JoinColumn(name = "question_true_false_id", referencedColumnName = "id")
    private QuestionTrueFalse question;

    @Override
    public String getType() {
        return type;
    }

    @Override
    public MediaBoolean getContent() {
        return content;
    }
}
