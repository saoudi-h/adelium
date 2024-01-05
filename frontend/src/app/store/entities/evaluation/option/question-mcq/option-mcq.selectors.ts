import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { optionMcqAdapter } from './option-mcq.adapter'

export const OptionMcqSelectors = createGenericSelectors<OptionMcq>(
    optionMcqAdapter,
    'optionMcqs'
)
