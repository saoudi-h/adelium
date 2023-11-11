/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class BooleanMedia extends BaseMedia {

    /**
     * The content of the media.
     */
    @Column private Boolean content;

    private static final String type = "boolean";

    @Override
    public String getType() {
        return type;
    }
}
