/* (C)2023 */
package com.adelium.web.quiz.core.question;

import com.adelium.web.quiz.core.answer.Answer;
import java.util.List;
import java.util.Set;

public interface Verifiable<T extends Answer> {
    boolean check(List<T> answers);

    Set<T> getAnswers();

    void setAnswers(Set<T> answers);
}
