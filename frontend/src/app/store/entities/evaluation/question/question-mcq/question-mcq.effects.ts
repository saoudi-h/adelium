import { Injectable } from '@angular/core'
import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { QuestionMcqActions } from './question-mcq.actions'
import { QuestionMcqService } from './question-mcq.service'

@Injectable({ providedIn: 'root' })
export class QuestionMcqEffects extends GenericEffects<QuestionMcq> {
    constructor(actions$: Actions, questionMcqService: QuestionMcqService) {
        super(actions$, questionMcqService, QuestionMcqActions, 'questionMcqs')
    }
}
