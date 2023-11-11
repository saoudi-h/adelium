/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Represents a text media object that extends BaseMedia.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class TextMedia extends BaseMedia {

    @Column private String content;

    private static final String type = "text";

    @Override
    public String getType() {
        return type;
    }
}
