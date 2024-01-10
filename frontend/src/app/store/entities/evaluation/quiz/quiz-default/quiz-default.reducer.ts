import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { QuizDefaultActions } from './quiz-default.actions'
import { quizDefaultAdapter } from './quiz-default.adapter'

export interface QuizDefaultState extends ExtendedState<QuizDefault> {
    relatedEntities: { [id: number]: { questions?: number[] } }
}

export const initialState: QuizDefaultState =
    quizDefaultAdapter.getInitialState({
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

export const quizDefaultReducer = createGenericReducer<QuizDefault>(
    quizDefaultAdapter,
    initialState,
    QuizDefaultActions,
    'quizDefaults'
)
