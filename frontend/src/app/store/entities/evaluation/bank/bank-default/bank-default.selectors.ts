import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { createGenericSelectors } from '@store/entities/generic/generic.selectors'
import { bankDefaultAdapter } from './bank-default.adapter'

export const BankDefaultSelectors = createGenericSelectors<BankDefault>(
    bankDefaultAdapter,
    'bankDefaults'
)
