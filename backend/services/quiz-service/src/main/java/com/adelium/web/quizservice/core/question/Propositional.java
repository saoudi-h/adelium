/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.option.Option;
import java.util.Set;

/**
 * This interface represents a propositional question in the quiz service.
 *
 * @param <T> the type of the options of the question
 */
public interface Propositional<T extends Option> extends Assessable {

    /**
     * Returns all the possible answers to this question.
     *
     * @return
     */
    Set<T> getOptions();

    /**
     * Sets all the possible answers to this question.
     *
     * @param options
     */
    void setOptions(Set<T> options);
}
