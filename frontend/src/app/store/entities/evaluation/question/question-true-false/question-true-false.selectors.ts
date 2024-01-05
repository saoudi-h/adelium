import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { questionTrueFalseAdapter } from './question-true-false.adapter'

export const QuestionTrueFalseSelectors =
    createGenericSelectors<QuestionTrueFalse>(
        questionTrueFalseAdapter,
        'questionTrueFalses'
    )
