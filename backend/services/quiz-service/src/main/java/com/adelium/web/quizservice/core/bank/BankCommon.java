/* (C)2023 */
package com.adelium.web.quizservice.core.bank;

import com.adelium.web.quizservice.core.question.Question;
import java.util.List;
import org.apache.catalina.User;

public class BankCommon implements Bank<Question> {
    @Override
    public String getName() {
        return null;
    }

    @Override
    public User getOwner() {
        return null;
    }

    @Override
    public List<Question> getQuestions() {
        return null;
    }

    @Override
    public void addQuestion(Question question) {}

    @Override
    public void removeQuestion(Question question) {}
}
