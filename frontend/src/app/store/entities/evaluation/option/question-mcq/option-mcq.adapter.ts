import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const optionMcqAdapter = createGenericAdapter<OptionMcq>()
