import { Injectable } from '@angular/core'
import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { QuizMcqActions } from './quiz-mcq.actions'
import { QuizMcqService } from './quiz-mcq.service'

@Injectable({ providedIn: 'root' })
export class QuizMcqEffects extends GenericEffects<QuizMcq> {
    constructor(
        actions$: Actions,
        quizMcqService: QuizMcqService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            quizMcqService,
            QuizMcqActions,
            'quizMcqs',
            notificationService
        )
    }
}
