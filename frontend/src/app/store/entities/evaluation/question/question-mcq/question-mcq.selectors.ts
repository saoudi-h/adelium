import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { questionMcqAdapter } from './question-mcq.adapter'

export const QuestionMcqSelectors = createGenericSelectors<QuestionMcq>(
    questionMcqAdapter,
    'questionMcqs'
)
