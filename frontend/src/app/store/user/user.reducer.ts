import { User } from '@core/entity/user.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { UserActions } from './user.actions'
import { userAdapter } from './user.adapter'

export interface UserState extends ExtendedState<User> {}

export const initialState: UserState = userAdapter.getInitialState({
    isLoading: false,
    error: null,
})

export const userReducer = createGenericReducer<User>(
    userAdapter,
    initialState,
    UserActions,
    'users'
)
