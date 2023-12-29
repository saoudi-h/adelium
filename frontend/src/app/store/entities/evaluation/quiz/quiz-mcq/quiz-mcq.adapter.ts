import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const quizMcqAdapter = createGenericAdapter<QuizMcq>()
