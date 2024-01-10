/* (C)2023 */
package com.adelium.web.quizservice.entity.option;

import com.adelium.web.quizservice.entity.media.BaseMedia;
import com.adelium.web.quizservice.entity.question.QuestionMCQ;
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
@Entity(name = "option_mcq")
public class OptionMCQ extends BaseOption<BaseMedia, BaseMedia> {

    @Column @Builder.Default private String type = "mcq";

    /**
     * The Explanation media content for the answer.
     */
    @OneToOne
    @JoinColumn(name = "explanation_media_id")
//    @JsonDeserialize(using = MediaDeserializer.class)
    protected BaseMedia explanation;

    /**
     * The media content for the answer.
     */
    @OneToOne
    @JoinColumn(name = "content_media_id")
//    @JsonDeserialize(using = MediaDeserializer.class)
    private BaseMedia content;

    @ManyToOne
    @JoinColumn(name = "question_mcq_id", referencedColumnName = "id")
    private QuestionMCQ question;
}
