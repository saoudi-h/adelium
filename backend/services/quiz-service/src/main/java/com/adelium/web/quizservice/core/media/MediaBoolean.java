/* (C)2023 */
package com.adelium.web.quizservice.core.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MediaBoolean extends BaseMedia {

    /**
     * The content of the media.
     */
    @Column private Boolean content;

    @Column private String type = "boolean";

    @Override
    public String getType() {
        return type;
    }
}
