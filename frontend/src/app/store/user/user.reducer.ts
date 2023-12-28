import { User } from '@core/entity/user.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { UserActions } from './user.actions'
import { userAdapter } from './user.adapter'

export interface UserState extends ExtendedState<User> {
    relatedEntities: { [id: number]: { roles?: number[] } }
}

export const initialState: UserState = userAdapter.getInitialState({
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

export const userReducer = createGenericReducer<User>(
    userAdapter,
    initialState,
    UserActions,
    'users'
)
