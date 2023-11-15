/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import java.util.Set;

/**
 * This interface represents a question that has multiple formulations.
 * It extends the Question interface and adds the ability to get the different
 * formulations of the question.
 *
 * @param <T> the type of media used in the question
 * @see Question
 */
public interface MultiFormulable<T extends Media> extends Question<T> {
    /**
     * Returns a set of different formulations for the same question.
     *
     * @return a set of formulations for the question
     */
    Set<T> getFormulations();

    /**
     * Sets the set of formulations for the question.
     *
     * @param formulations the set of formulations for the question
     */
    void setFormulations(Set<T> formulations);
}
