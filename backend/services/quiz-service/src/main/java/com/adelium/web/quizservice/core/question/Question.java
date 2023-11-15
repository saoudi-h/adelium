/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.tag.Tag;
import java.io.Serializable;
import java.util.Set;

/**
 * The Question interface represents a question in a quiz.
 * It is a generic interface that can be implemented with different types of media.
 * @param <T> the type of media associated with the question
 * @see Media
 * @see Serializable
 */
public interface Question<T extends Media> extends Serializable {

    /**
     * Returns the content associated with this question.
     *
     * @return the content associated with this question
     */
    T getContent();

    /**
     * Sets the media associated with this question.
     *
     * @param content the media to associate with this question
     */
    void setContent(T content);

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
