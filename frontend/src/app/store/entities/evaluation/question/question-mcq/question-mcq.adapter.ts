import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const questionMcqAdapter = createGenericAdapter<QuestionMcq>()
