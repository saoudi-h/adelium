export enum ThemeChoice {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
}

export enum SystemTheme {
    Dark = 'dark',
    Light = 'light',
}

export enum AppRoute {
    Admin = 'admin',
    Public = 'public',
}

export const DaisyUIThemes = {
    adminDark: 'admin-dark',
    adminLight: 'admin-light',
    dark: 'dark',
    light: 'light',
}

export interface ThemeState {
    userChoice: ThemeChoice
    systemPreference: SystemTheme
    currentRoute: AppRoute
    daisyUITheme: string
}
