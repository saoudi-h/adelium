/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.evaluation.Evaluation;
import com.adelium.web.quizservice.core.media.Media;

/**
 * This interface represents an assessable question, which is a question that can be evaluated based on a user's answer.
 * It extends the Question interface and adds the ability to assess a user's answer.
 * @param <T> the type of media used in the question
 * @param <M> the type of media used in the user's answer
 * @see Question
 */
public interface Assessable<T extends Media, M extends Media> extends Question<T> {

    /**
     * Evaluates the user's answer to this question.
     *
     * @return the evaluation of the user's answer
     * @see Evaluation
     */
    Evaluation assess(M userAnswer);
}
