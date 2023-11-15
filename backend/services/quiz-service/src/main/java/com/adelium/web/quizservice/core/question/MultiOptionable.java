/* (C)2023 */
package com.adelium.web.quizservice.core.question;

import com.adelium.web.quizservice.core.media.Media;
import com.adelium.web.quizservice.core.option.Option;
import java.util.Set;

/**
 * This interface represents a question that has multiple options to choose from.
 * It extends the Propositional interface and adds a method to generate a set of options
 * from a larger selection, possibly including true options.
 *
 * @param <O> the type of option used in the question
 * @param <T> the type of media used in the question's text
 * @param <M> the type of media used in the question's options
 * @see Propositional
 */
interface MultiOptionable<O extends Option, T extends Media, M extends Media>
        extends Optionable<O, T, M> {

    /**
     * Generates a set of options from a larger selection, possibly including true
     * options.
     *
     * @param numberOfOptions the number of options to generate
     * @return a set of generated options
     */
    Set<O> generateOptions(int numberOfOptions);
}
