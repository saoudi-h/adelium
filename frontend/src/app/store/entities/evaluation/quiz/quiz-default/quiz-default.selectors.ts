import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { quizDefaultAdapter } from './quiz-default.adapter'

export const QuizDefaultSelectors = createGenericSelectors<QuizDefault>(
    quizDefaultAdapter,
    'quizDefaults'
)
