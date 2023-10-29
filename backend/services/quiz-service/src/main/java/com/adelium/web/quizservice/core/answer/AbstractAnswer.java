/* (C)2023 */
package com.adelium.web.quizservice.core.answer;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
public abstract class AbstractAnswer extends BaseEntity<Long> implements Answer {}
