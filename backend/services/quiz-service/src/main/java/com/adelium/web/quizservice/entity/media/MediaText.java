/* (C)2023 */
package com.adelium.web.quizservice.entity.media;

import com.adelium.web.quizservice.core.media.BaseMedia;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Represents a text media object that extends BaseMedia.
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@SuperBuilder
public class MediaText extends BaseMedia {

    @Column private String content;

    @Builder.Default @Column private String type = "text";

    @Override
    public String getType() {
        return type;
    }
}
