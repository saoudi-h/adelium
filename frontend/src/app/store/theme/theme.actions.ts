import { createAction, props } from '@ngrx/store'
import { AppRoute, SystemTheme, ThemeChoice } from './theme.types'

/**
 * Action to initialize the theme.
 * @example
 * // Initialize the theme
 * this.store.dispatch(initTheme())
 */
export const initTheme = createAction('[Theme] Init Theme')
/**
 * Sets the user theme choice.
 * @param choice The choice for the user theme.
 */
export const setUserThemeChoice = createAction(
    '[Theme] Set User Theme Choice',
    props<{ choice: ThemeChoice }>()
)

/**
 * Sets the system theme preference.
 * @param preference The preference for the system theme.
 */
export const setSystemThemePreference = createAction(
    '[Theme] Set System Theme Preference',
    props<{ preference: SystemTheme }>()
)

/**
 * Action to set the current route
 * @example
 * // Set the current route to admin
 * this.store.dispatch(setRoute({ route: AppRoute.Admin }))
 * @example
 * // Set the current route to public
 * this.store.dispatch(setRoute({ route: AppRoute.Public }))
 * @param route The current route
 */
export const setRoute = createAction(
    '[Theme] Set Route',
    props<{ route: AppRoute }>()
)
