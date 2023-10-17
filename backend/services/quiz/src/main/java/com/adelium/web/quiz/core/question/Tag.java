/* (C)2023 */
package com.adelium.web.quiz.core.question;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Tag extends BaseEntity<Long> {

    @Column(unique = true)
    String name;
}
