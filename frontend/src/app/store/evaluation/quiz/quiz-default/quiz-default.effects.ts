import { Injectable } from '@angular/core'
import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { QuizDefaultActions } from './quiz-default.actions'
import { QuizDefaultService } from './quiz-default.service'

@Injectable({ providedIn: 'root' })
export class QuizDefaultEffects extends GenericEffects<QuizDefault> {
    constructor(actions$: Actions, quizDefaultService: QuizDefaultService) {
        super(actions$, quizDefaultService, QuizDefaultActions, 'quizDefaults')
    }
}
