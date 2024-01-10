import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { OptionMcqActions } from './option-mcq.actions'
import { optionMcqAdapter } from './option-mcq.adapter'

export interface OptionMcqState extends ExtendedState<OptionMcq> {
    relatedEntities: { [id: number]: { options?: number[] } }
}

export const initialState: OptionMcqState = optionMcqAdapter.getInitialState({
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
    relatedEntity: {},
    transactions: {},
    isLoading: false,
    error: null,
})

export const optionMcqReducer = createGenericReducer<OptionMcq>(
    optionMcqAdapter,
    initialState,
    OptionMcqActions,
    'optionMcqs'
)
