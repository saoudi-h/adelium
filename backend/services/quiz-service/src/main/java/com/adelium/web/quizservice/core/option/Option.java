/* (C)2023 */
package com.adelium.web.quizservice.core.option;

import com.adelium.web.quizservice.core.media.Media;
import java.io.Serializable;

/**
 * This interface represents an option in a quiz. It is a generic interface that can be implemented with different types of options.
 * @param <O> the type of media used in the option
 * @param <E> the type of media used in the explanation
 */
public interface Option<O extends Media, E extends Media> extends Serializable {

    /**
     * Gets the explanation for this option.
     *
     * @return the explanation for this option
     */
    E getExplanation();

    /**
     * Sets the explanation for this option.
     *
     * @param explanation the explanation for this option.
     */
    void setExplanation(E explanation);

    /**
     * Checks if this option is correct.
     *
     * @return true if the option is correct, false otherwise
     */
    boolean isCorrect();

    /**
     * Checks if this option is enabled.
     *
     * @return true if the option is enabled, false otherwise
     */
    boolean isEnable();

    /**
     * Gets the type of the option.
     *
     * @return the type of the option
     */
    String getType();

    /**
     * Gets the content of the option.
     *
     * @return the content of the option
     */
    O getContent();
}
