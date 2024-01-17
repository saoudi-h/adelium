import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const QuizMcqActions = createEntityActions<QuizMcq>('Quiz-mcq')
