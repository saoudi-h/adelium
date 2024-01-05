import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const QuestionTrueFalseActions =
    createEntityActions<QuestionTrueFalse>('Question-mcq')
