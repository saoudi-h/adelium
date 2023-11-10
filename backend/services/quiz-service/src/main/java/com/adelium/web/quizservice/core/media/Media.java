/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import java.io.Serializable;

/**
 * Represents the common interface for multimedia content of a question or an option.
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
