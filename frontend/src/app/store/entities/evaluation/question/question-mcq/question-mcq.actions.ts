import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const QuestionMcqActions =
    createEntityActions<QuestionMcq>('Question-mcq')
