import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import {
    RequestQueueState,
    requestQueueReducer,
} from '@store/request-queue/request-queue.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'
import { UserState, userReducer } from '@store/user/user.reducer'
import { AuthState, authReducer } from './../store/auth/auth.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
    auth: AuthState
    users: UserState
    requestQueue: RequestQueueState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
    notifications: notificationReducer,
    auth: authReducer,
    users: userReducer,
    requestQueue: requestQueueReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
