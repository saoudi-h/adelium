/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import java.io.Serializable;

/**
 * Represents the common interface for multimedia content of a question or an option
 * in a quiz. It is a generic interface that can be implemented with different types of media.
 */
public interface Media extends Serializable {
    /**
     * Returns the type of the media content.
     *
     * @return the type of the media content
     */
    String getType();

    /**
     * Returns the actual content data.
     *
     * @return the actual content data
     */
    Object getContent();
}
