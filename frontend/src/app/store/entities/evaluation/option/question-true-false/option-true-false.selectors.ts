import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { createGenericSelectors } from '@store/entities/generic/generic.selectors'
import { optionTrueFalseAdapter } from './option-true-false.adapter'

export const OptionTrueFalseSelectors = createGenericSelectors<OptionTrueFalse>(
    optionTrueFalseAdapter,
    'optionTrueFalses'
)
