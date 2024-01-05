import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const OptionTrueFalseActions =
    createEntityActions<OptionTrueFalse>('Option-true-false')
