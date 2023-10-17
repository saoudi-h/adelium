/* (C)2023 */
package com.adelium.web.quiz.core.question;

import com.adelium.web.quiz.core.answer.AnswerTrueFalse;
import jakarta.persistence.*;
import java.util.List;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
public class QuestionTrueFalse extends AbstractQuestion implements Verifiable<AnswerTrueFalse> {

    @OneToMany(mappedBy = "question")
    private Set<AnswerTrueFalse> answers;

    private boolean enabled;

    @Override
    public boolean check(List<AnswerTrueFalse> answers) {
        return false;
    }

    @Override
    public Set<AnswerTrueFalse> getAnswers() {
        return answers;
    }

    @Override
    public void setAnswers(Set<AnswerTrueFalse> answers) {
        this.answers = answers;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
