import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { quizMcqAdapter } from './quiz-mcq.adapter'

export const QuizMcqSelectors = createGenericSelectors<QuizMcq>(
    quizMcqAdapter,
    'quizMcqs'
)
