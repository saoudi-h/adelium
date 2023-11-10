/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.tag.Tag;
import java.io.Serializable;
import java.util.Set;

/**
 * This interface represents a question in the quiz service.
 */
public interface Question extends Serializable {

    /**
     * Returns the media associated with this question.
     * @return
     */
    Media getContent();

    /**
     * Sets the media associated with this question.
     * @param content
     */
    void setContent(Media content);

    /**
     * Returns the set of tags associated with this question.
     *
     * @return the set of tags associated with this question
     */
    Set<Tag> getTags();

    /**
     * Returns whether this question is enabled or not.
     *
     * @return true if this question is enabled, false otherwise
     */
    boolean isEnabled();

    /**
     * Returns the type of the question.
     *
     * @return the type of the question
     */
    String getType();
}
