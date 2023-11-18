/* (C)2023 */
package com.adelium.web.quizservice.entity.option;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.option.BaseOption;
import com.adelium.web.quizservice.entity.question.QuestionMCQ;
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
@Entity(name = "option_mcq")
public class OptionMCQ extends BaseOption<BaseMedia, BaseMedia> {

    private static final String type = "qcm";

    /**
     * The Explanation media content for the answer.
     */
    @OneToOne
    @JoinColumn(name = "explanation_media_id")
    protected BaseMedia explanation;

    /**
     * The media content for the answer.
     */
    @OneToOne
    @JoinColumn(name = "content_media_id")
    private BaseMedia content;

    @ManyToOne
    @JoinColumn(name = "question_mcq_id", referencedColumnName = "id")
    private QuestionMCQ question;

    @Override
    public String getType() {
        return type;
    }

    @Override
    public BaseMedia getContent() {
        return content;
    }
}
