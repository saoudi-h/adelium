/* (C)2023 */
package com.adelium.web.quizservice.entity.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
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

    /**
     * The type of the media.
     */
    @Column @Builder.Default private String type = "boolean";

    @Override
    public String getType() {
        return type;
    }
}
