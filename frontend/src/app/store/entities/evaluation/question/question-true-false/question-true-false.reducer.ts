import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { QuestionTrueFalseActions } from './question-true-false.actions'
import { questionTrueFalseAdapter } from './question-true-false.adapter'

export interface QuestionTrueFalseState
    extends ExtendedState<QuestionTrueFalse> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: QuestionTrueFalseState =
    questionTrueFalseAdapter.getInitialState({
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

export const questionTrueFalseReducer = createGenericReducer<QuestionTrueFalse>(
    questionTrueFalseAdapter,
    initialState,
    QuestionTrueFalseActions,
    'questionTrueFalses'
)
