/* (C)2023 */
package com.adelium.web.quiz.core.answer;

import com.adelium.web.quiz.core.question.QuestionTrueFalse;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
public class AnswerTrueFalse extends AbstractAnswer {
    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private QuestionTrueFalse question;

    @Override
    public boolean isEnable() {
        return false;
    }
}
