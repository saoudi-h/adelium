import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const QuestionMcqActions =
    createEntityActions<QuestionMcq>('Question-mcq')
