import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import {
    PaginationState,
    paginationReducer,
} from '@store/pagination/pagination.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'
import { UserState, userReducer } from '@store/user/user.reducer'
import { AuthState, authReducer } from './../store/auth/auth.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
    auth: AuthState
    users: UserState
    pagination: PaginationState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
    notifications: notificationReducer,
    auth: authReducer,
    users: userReducer,
    pagination: paginationReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
