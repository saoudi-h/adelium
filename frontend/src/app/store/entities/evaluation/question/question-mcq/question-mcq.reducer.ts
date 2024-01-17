import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/entities/generic/generic.reducer'
import { QuestionMcqActions } from './question-mcq.actions'
import { questionMcqAdapter } from './question-mcq.adapter'

export interface QuestionMcqState extends ExtendedState<QuestionMcq> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: QuestionMcqState =
    questionMcqAdapter.getInitialState({
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

export const questionMcqReducer = createGenericReducer<QuestionMcq>(
    questionMcqAdapter,
    initialState,
    QuestionMcqActions,
    'questionMcqs'
)
