/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.option.Option;
import java.util.Set;

/**
 * This interface represents an Optionable question, which is a question that
 * has a set of options.
 * It extends the Assessable interface and adds the ability to get and set the
 * options associated with the question.
 * and adds the ability to get and set the number of options associated with the
 * question.
 *
 * @param <O> the type of options used in the question
 * @param <T> the type of media used in the question
 * @param <M> the type of media used in the user's answer
 * @see Assessable
 */
public interface Optionable<O extends Option, T extends Media, M extends Media>
        extends Assessable<T, M> {

    /**
     * Returns the number of options of the question.
     *
     * @return the number of options of the question
     */
    int getNumberOfOptions();

    /**
     * Defines the number of options of the question.
     *
     * @param numberOfOptions the number of options of the question
     */
    void setNumberOfOptions(int numberOfOptions);

    /**
     * Returns the set of options associated with this question.
     *
     * @return the set of options associated with this question
     */
    Set<O> getOptions();

    /**
     * Sets the set of options associated with this question.
     *
     * @param options the set of options to associate with this question
     */
    void setOptions(Set<O> options);
}
