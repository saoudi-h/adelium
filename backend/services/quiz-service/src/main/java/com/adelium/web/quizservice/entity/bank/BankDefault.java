/* (C)2023 */
package com.adelium.web.quizservice.entity.bank;

import com.adelium.web.quizservice.core.bank.Bank;
import com.adelium.web.quizservice.core.bank.BaseBank;
import com.adelium.web.quizservice.core.media.BaseMedia;
import com.adelium.web.quizservice.core.question.BaseQuestion;
import com.adelium.web.quizservice.core.question.Question;
import jakarta.persistence.*;
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "bank_question",
            joinColumns = @JoinColumn(name = "bank_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
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