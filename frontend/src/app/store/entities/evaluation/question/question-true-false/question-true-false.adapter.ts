import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const questionTrueFalseAdapter =
    createGenericAdapter<QuestionTrueFalse>()
