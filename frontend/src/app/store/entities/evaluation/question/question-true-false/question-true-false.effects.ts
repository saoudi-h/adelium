import { Injectable } from '@angular/core'
import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { QuestionTrueFalseActions } from './question-true-false.actions'
import { QuestionTrueFalseService } from './question-true-false.service'

@Injectable({ providedIn: 'root' })
export class QuestionTrueFalseEffects extends GenericEffects<QuestionTrueFalse> {
    constructor(
        actions$: Actions,
        questionTrueFalseService: QuestionTrueFalseService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            questionTrueFalseService,
            QuestionTrueFalseActions,
            'questionTrueFalses',
            notificationService
        )
    }
}
