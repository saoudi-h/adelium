/* (C)2023 */
package com.adelium.web.quiz.core.bank;

import com.adelium.web.quiz.core.question.Question;
import java.util.List;
import org.apache.catalina.User;

public interface Bank<T extends Question> {
    String getName();

    User getOwner();

    List<T> getQuestions();

    void addQuestion(T question);

    void removeQuestion(T question);
}
