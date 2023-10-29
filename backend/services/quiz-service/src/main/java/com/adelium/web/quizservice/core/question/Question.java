/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import java.io.Serializable;
import java.util.Set;

public interface Question extends Serializable {

    Set<Tag> getTags();

    boolean isEnabled();
}
