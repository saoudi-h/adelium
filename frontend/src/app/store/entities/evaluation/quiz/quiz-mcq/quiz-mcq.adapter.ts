import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const quizMcqAdapter = createGenericAdapter<QuizMcq>()
