/* (C)2023 */
package com.adelium.web.quizservice.entity.media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@SuperBuilder
public class MediaLong extends BaseMedia {

    /**
     * The content of the media.
     */
    @Column private Long content;

    @Column @Builder.Default private String type = "Long";

    @Override
    public String getType() {
        return type;
    }
}
