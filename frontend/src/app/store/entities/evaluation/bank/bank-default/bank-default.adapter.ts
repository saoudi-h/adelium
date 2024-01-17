import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const bankDefaultAdapter = createGenericAdapter<BankDefault>()
