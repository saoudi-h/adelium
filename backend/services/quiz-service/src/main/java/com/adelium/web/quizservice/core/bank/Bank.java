/* (C)2023 */
package com.adelium.web.quizservice.core.bank;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import com.adelium.web.quizservice.core.tag.Tag;
import java.util.Set;

/**
 * This interface represents a bank of questions.
 *
 * @param <Q> the type of questions in the bank
 * @param <M> the type of media associated with the questions
 * @see Question
 * @see Media
 */
public interface Bank<Q extends Question<M>, M extends Media> {

    /**
     * Returns a set of tags associated with the bank.
     *
     * @return a set of tags associated with the bank
     */
    Set<Tag> getTags();

    /**
     * Returns the name of the bank.
     *
     * @return the name of the bank
     */
    String getName();

    /**
     * Returns the ID of the owner of the bank.
     *
     * @return
     */
    Long getOwnerId();

    /**
     * Retrieves a set of questions.
     *
     * @return a set (Set) of objects of type Q (Question)
     */
    Set<Q> getQuestions();

    /**
     * Adds a question to the bank.
     *
     * @param question the question to add
     */
    void addQuestion(Q question);

    /**
     * Removes a question from the bank.
     *
     * @param question the question to remove
     */
    void removeQuestion(Q question);

    /**
     * Returns the type of the bank.
     *
     * @return the type of the bank
     */
    String getType();
}
