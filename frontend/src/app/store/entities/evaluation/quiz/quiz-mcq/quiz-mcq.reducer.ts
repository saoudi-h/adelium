import { QuizMcq } from '@core/entity/evaluation/quiz-mcq.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/entities/generic/generic.reducer'
import { QuizMcqActions } from './quiz-mcq.actions'
import { quizMcqAdapter } from './quiz-mcq.adapter'

export interface QuizMcqState extends ExtendedState<QuizMcq> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: QuizMcqState = quizMcqAdapter.getInitialState({
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

export const quizMcqReducer = createGenericReducer<QuizMcq>(
    quizMcqAdapter,
    initialState,
    QuizMcqActions,
    'quizMcqs'
)
