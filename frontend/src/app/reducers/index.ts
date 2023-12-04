import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'
import { AuthState, authReducer } from './../store/auth/auth.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
    auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
    notifications: notificationReducer,
    auth: authReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
