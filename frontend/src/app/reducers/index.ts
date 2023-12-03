import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
    notifications: notificationReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
