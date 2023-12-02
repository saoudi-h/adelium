import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'

export interface AppState {
    theme: ThemeState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
