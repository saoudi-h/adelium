import { createSelector } from '@ngrx/store'
import { AppState } from '@reducers'
import { ThemeState } from './theme.reducer'

// Sélecteur pour accéder à l'état global du thème
export const selectThemeState = (state: AppState) => state.theme

// Sélecteur pour obtenir le choix de thème actuel de l'utilisateur
export const selectUserThemeChoice = createSelector(
    selectThemeState,
    (state: ThemeState) => state.userChoice
)

// Sélecteur pour obtenir la préférence de thème du système
export const selectSystemThemePreference = createSelector(
    selectThemeState,
    (state: ThemeState) => state.systemPreference
)

// Sélecteur pour obtenir la route actuelle
export const selectCurrentRoute = createSelector(
    selectThemeState,
    (state: ThemeState) => state.currentRoute
)

// Sélecteur pour obtenir le thème de DaisyUI actuellement actif
export const selectDaisyUITheme = createSelector(
    selectThemeState,
    (state: ThemeState) => state.daisyUITheme
)
