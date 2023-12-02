import { createReducer, on } from '@ngrx/store'
import * as themeActions from './theme.actions'
import {
    AppRoute,
    DaisyUIThemes,
    SystemTheme,
    ThemeChoice,
} from './theme.types'

export interface ThemeState {
    userChoice: ThemeChoice
    systemPreference: SystemTheme
    currentRoute: AppRoute
    daisyUITheme: string
}

export const initialState: ThemeState = {
    userChoice: ThemeChoice.System,
    systemPreference: SystemTheme.Light,
    currentRoute: AppRoute.Public,
    daisyUITheme: DaisyUIThemes.light,
}

// const resolveDaisyUITheme = (state: ThemeState): string => {
//     let baseTheme: string

//     if (state.userChoice === ThemeChoice.System) {
//         baseTheme =
//             state.systemPreference === SystemTheme.Dark ? 'Dark' : 'Light'
//     } else {
//         baseTheme =
//             state.userChoice.charAt(0).toUpperCase() + state.userChoice.slice(1)
//     }

//     if (state.currentRoute === AppRoute.Admin) {
//         return `admin-${baseTheme.toLowerCase()}`
//     } else {
//         return baseTheme.toLowerCase()
//     }
// }

const resolveDaisyUITheme = (
    userChoice: ThemeChoice,
    systemPreference: SystemTheme,
    currentRoute: AppRoute
): string => {
    const isDarkMode =
        userChoice === ThemeChoice.System
            ? systemPreference === SystemTheme.Dark
            : userChoice === ThemeChoice.Dark
    const themePrefix = currentRoute === AppRoute.Admin ? 'admin-' : ''
    const resolvedDaisyUITheme = `${themePrefix}${
        isDarkMode ? 'dark' : 'light'
    }`
    document.documentElement.setAttribute('data-theme', resolvedDaisyUITheme)
    return resolvedDaisyUITheme
}

export const themeReducer = createReducer(
    initialState,
    on(themeActions.setUserThemeChoice, (state, { choice }) => ({
        ...state,
        userChoice: choice,
        daisyUITheme: resolveDaisyUITheme(
            choice,
            state.systemPreference,
            state.currentRoute
        ),
    })),
    on(themeActions.setSystemThemePreference, (state, { preference }) => ({
        ...state,
        systemPreference: preference,
        daisyUITheme: resolveDaisyUITheme(
            state.userChoice,
            preference,
            state.currentRoute
        ),
    })),
    on(themeActions.setRoute, (state, { route }) => ({
        ...state,
        currentRoute: route,
        daisyUITheme: resolveDaisyUITheme(
            state.userChoice,
            state.systemPreference,
            route
        ),
    }))
)
