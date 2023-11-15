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
public class MediaLong extends BaseMedia {

    /**
     * The content of the media.
     */
    @Column private Long content;

    private static final String type = "Long";

    @Override
    public String getType() {
        return type;
    }
}
