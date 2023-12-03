import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ThemeState } from './theme.reducer'

/**
 * Selects the theme state from the store.
 * @returns {MemoizedSelector<object, ThemeState>} The memoized selector function.
 */
export const selectThemeState = createFeatureSelector<ThemeState>('theme')

/**
 * Selects the user theme choice from the theme state.
 *
 * @param state - The theme state.
 * @returns The user theme choice.
 */
export const selectUserThemeChoice = createSelector(
    selectThemeState,
    (state: ThemeState) => state.userChoice
)

/**
 * Selects the system theme preference from the theme state.
 *
 * @param state - The theme state.
 * @returns The system theme preference.
 */
export const selectSystemThemePreference = createSelector(
    selectThemeState,
    (state: ThemeState) => state.systemPreference
)

/**
 * Selects the current route from the theme state.
 *
 * @param state - The theme state.
 * @returns The current route.
 */
export const selectCurrentRoute = createSelector(
    selectThemeState,
    (state: ThemeState) => state.currentRoute
)

/**
 * Selects the Daisy UI theme from the theme state.
 *
 * @param state - The theme state.
 * @returns The Daisy UI theme.
 */
export const selectDaisyUITheme = createSelector(
    selectThemeState,
    (state: ThemeState) => state.daisyUITheme
)
