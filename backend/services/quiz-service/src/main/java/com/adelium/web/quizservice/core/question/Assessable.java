/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.evaluation.Evaluation;
import com.adelium.web.quizservice.core.media.Media;

/**
 * Represents an assessable question.
 */
public interface Assessable extends Question {
    /**
     * Assess the provided answer and return a score or evaluation result.
     *
     * @param userAnswer the user-provided answer
     * @return the assessment result, score, or feedback
     */
    Evaluation assess(Media userAnswer);
}
