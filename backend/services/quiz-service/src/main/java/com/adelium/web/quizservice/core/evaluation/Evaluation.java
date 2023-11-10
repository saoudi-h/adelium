/* (C)2023 */
package com.adelium.web.quizservice.core.evaluation;

import java.io.Serializable;

/**
 * Represents the result of an evaluation, including a score and feedback.
 */
public interface Evaluation extends Serializable {
    /**
     * Gets the score of the evaluation.
     *
     * @return the score of the evaluation
     */
    int getScore();

    /**
     * Gets the feedback provided as part of the evaluation.
     *
     * @return the feedback provided as part of the evaluation
     */
    String getFeedback();
}
