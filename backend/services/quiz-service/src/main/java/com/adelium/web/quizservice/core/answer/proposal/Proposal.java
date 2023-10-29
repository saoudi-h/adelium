/* (C)2023 */
package com.adelium.web.quizservice.core.answer.proposal;

public interface Proposal<T> {

    boolean isCorrect();

    String getExplanation();

    void setExplanation();

    T getValue();

    void setValue(T value);
}
