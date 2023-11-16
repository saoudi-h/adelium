/* (C)2023 */
package com.adelium.web.quizservice.core.quiz;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.question.Question;
import java.io.Serializable;
import java.util.Set;

/**
 * This interface represents a quiz, which is a collection of questions.
 *
 * @param <Q> the type of questions in the quiz
 * @param <M> the type of media associated with the questions
 */
public interface Quiz<Q extends Question<M>, M extends Media> extends Serializable {

    /**
     * Returns the set of questions for this quiz.
     *
     * @return the set of questions for this quiz
     */
    Set<Q> getQuestions();

    /**
     * Returns the name of this quiz.
     *
     * @return the name of this quiz
     */
    String getName();

    /**
     * Returns the description of this quiz.
     *
     * @return the description of this quiz
     */
    String getDescription();

    /**
     * Returns whether this quiz is enabled.
     *
     * @return whether this quiz is enabled
     */
    boolean isEnabled();

    /**
     * Returns the type of this quiz.
     *
     * @return the type of this quiz
     */
    String getType();
}
