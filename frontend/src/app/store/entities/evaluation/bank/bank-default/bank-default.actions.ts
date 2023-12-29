import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const BankDefaultActions =
    createEntityActions<BankDefault>('Bank-default')
