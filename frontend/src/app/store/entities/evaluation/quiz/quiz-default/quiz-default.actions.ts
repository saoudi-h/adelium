import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const QuizDefaultActions =
    createEntityActions<QuizDefault>('Quiz-default')
