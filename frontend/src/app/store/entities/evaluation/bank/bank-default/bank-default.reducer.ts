import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { BankDefaultActions } from './bank-default.actions'
import { bankDefaultAdapter } from './bank-default.adapter'

export interface BankDefaultState extends ExtendedState<BankDefault> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: BankDefaultState =
    bankDefaultAdapter.getInitialState({
        paginationInfo: {
            params: {
                page: 0,
                size: 5,
                sort: [],
            },
            result: {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0,
            },
            pageIds: [],
        },
        relatedEntities: {},
        transactions: {},
        isLoading: false,
        error: null,
    })

export const bankDefaultReducer = createGenericReducer<BankDefault>(
    bankDefaultAdapter,
    initialState,
    BankDefaultActions,
    'bankDefaults'
)
