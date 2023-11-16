/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.option.Option;
import java.util.Set;

/**
 * Represents an interface for a question in a quiz system that supports
 * multiple options.
 * This interface extends {@link Optionable} and provides functionality to
 * handle various types
 * of options with different media types for their content and explanation.
 * <p>
 * This interface is designed for scenarios in quiz systems where questions
 * involve multiple
 * choice options, each potentially having different types of media for content
 * and explanation.
 * </p>
 *
 * @param <O> the type of option, extending {@link Option} with media types A
 *            and B
 * @param <A> the type of media used for the content of the option
 * @param <B> the type of media used for the explanation of the option
 * @param <T> the type of media used for the text of the question
 * @param <M> the type of media used for the media elements in the options
 * @see Optionable
 */
public interface MultiOptionable<
                O extends Option<A, B>,
                A extends Media,
                B extends Media,
                T extends Media,
                M extends Media>
        extends Optionable<O, T, M> {

    /**
     * Generates a set of options for a question in the quiz.
     * This method is responsible for creating and returning a specific number of
     * options
     * for a quiz question, allowing for diverse and dynamic question formats.
     *
     * @param numberOfOptions the number of options to generate
     * @return a set of generated options of type {@link O}
     */
    Set<O> generateOptions(int numberOfOptions);
}
