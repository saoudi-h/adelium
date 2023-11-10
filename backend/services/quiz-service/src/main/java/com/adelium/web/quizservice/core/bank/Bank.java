/* (C)2023 */
package com.adelium.web.quizservice.core.bank;

import com.adelium.web.quizservice.core.question.Question;
import java.util.List;
import org.apache.catalina.User;

/**
 * This interface represents a bank of questions.
 * A bank has a name, an owner, and a list of questions.
 * @param <T> the type of question in the bank
 */
public interface Bank<T extends Question> {
    /**
     * Returns the name of the bank.
     *
     * @return the name of the bank
     */
    String getName();

    /**
     * Returns the owner of the bank.
     *
     * @return the owner of the bank
     */
    User getOwner();

    /**
     * Returns the list of questions in the bank.
     *
     * @return the list of questions in the bank
     */
    List<T> getQuestions();

    /**
     * Adds a question to the bank.
     *
     * @param question the question to add
     */
    void addQuestion(T question);

    /**
     * Removes a question from the bank.
     *
     * @param question the question to remove
     */
    void removeQuestion(T question);
}
