import { Authority } from '@core/entity/auth/authority.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { AuthorityActions } from './authority.actions'
import { authorityAdapter } from './authority.adapter'

export interface AuthorityState extends ExtendedState<Authority> {
    relatedEntities: { [id: number]: { roles?: number[] } }
}

export const initialState: AuthorityState = authorityAdapter.getInitialState({
    paginationInfo: {
        params: {
            page: 0,
            size: 20,
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
    transactions: {},
    relatedEntities: {},
    relatedEntity: {},
    isLoading: false,
    error: null,
})

export const authorityReducer = createGenericReducer<Authority>(
    authorityAdapter,
    initialState,
    AuthorityActions,
    'authorities'
)
