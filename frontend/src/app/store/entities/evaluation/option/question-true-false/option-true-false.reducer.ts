import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { OptionTrueFalseActions } from './option-true-false.actions'
import { optionTrueFalseAdapter } from './option-true-false.adapter'

export interface OptionTrueFalseState extends ExtendedState<OptionTrueFalse> {
    relatedEntities: { [id: number]: { options?: number[] } }
}

export const initialState: OptionTrueFalseState =
    optionTrueFalseAdapter.getInitialState({
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

export const optionTrueFalseReducer = createGenericReducer<OptionTrueFalse>(
    optionTrueFalseAdapter,
    initialState,
    OptionTrueFalseActions,
    'optionTrueFalses'
)
