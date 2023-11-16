/* (C)2023 */
package com.adelium.web.quizservice.core.bank;

import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.question.BaseQuestion;
import com.adelium.web.quizservice.core.question.Question;
import jakarta.persistence.Entity;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * This class represents a default bank.
 * It extends the BaseBank class and implements the Bank interface.
 *
 * @param <Q> the type of questions in the bank
 * @param <M> the type of media associated with the questions
 * @see BaseBank
 * @see Bank
 * @see BaseQuestion
 * @see BaseMedia
 * @see Question
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@Entity
public class BankDefault extends BaseBank<BaseQuestion<BaseMedia>, BaseMedia> {

    private Set<BaseQuestion<BaseMedia>> questions;

    @Override
    public void addQuestion(BaseQuestion<BaseMedia> question) {
        questions.add(question);
    }

    @Override
    public void removeQuestion(BaseQuestion<BaseMedia> question) {
        questions.remove(question);
    }
}
