/* (C)2023 */
package com.adelium.web.quizservice.entity.option;

import com.adelium.web.quizservice.entity.media.MediaBoolean;
import com.adelium.web.quizservice.entity.media.MediaText;
import com.adelium.web.quizservice.entity.question.QuestionTrueFalse;
import jakarta.persistence.*;
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

    @Column @Builder.Default private String type = "true-false";

    /**
     * The media content representing the option.
     */
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "explanation_text_media_id")
    protected MediaText explanation;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "content_boolean_media_id", referencedColumnName = "id")
    private MediaBoolean content;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "question_true_false_id", referencedColumnName = "id")
    private QuestionTrueFalse question;

}
