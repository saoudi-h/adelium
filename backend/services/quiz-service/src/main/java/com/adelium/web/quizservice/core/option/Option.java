/* (C)2023 */
package com.adelium.web.quizservice.core.option;

import com.adelium.web.quizservice.core.media.Media;
import java.io.Serializable;

/**
 * Represents an option for a quiz question.
 */
public interface Option extends Serializable {

    /**
     * Gets the explanation associated with this option.
     *
     * @return the explanation of the option
     */
    Media getExplanation();

    /**
     * Sets the explanation for this option.
     *
     * @param explanation the explanation to set
     */
    void setExplanation(Media explanation);

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
}
