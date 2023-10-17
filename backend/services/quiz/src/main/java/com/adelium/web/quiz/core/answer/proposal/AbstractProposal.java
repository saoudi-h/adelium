/* (C)2023 */
package com.adelium.web.quiz.core.answer.proposal;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public abstract class AbstractProposal<T> extends BaseEntity<Long> implements Proposal<T> {

    @Column protected boolean correct;

    @Column protected String explanation;

    @Column protected T value;
}
