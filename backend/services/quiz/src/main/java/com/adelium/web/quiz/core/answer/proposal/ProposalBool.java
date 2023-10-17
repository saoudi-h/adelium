/* (C)2023 */
package com.adelium.web.quiz.core.answer.proposal;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@SuperBuilder
@Entity
public class ProposalBool extends AbstractProposal<Boolean> {

    @Override
    public void setExplanation() {}
}
