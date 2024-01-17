import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const quizDefaultAdapter = createGenericAdapter<QuizDefault>()
