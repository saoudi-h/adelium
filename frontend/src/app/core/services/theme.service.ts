import { Injectable } from '@angular/core'

export enum ThemeType {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
}

/**
 * Service gérant le thème de l'application.
 */
@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly THEME_KEY = 'color-theme'

    /**
     * Initialise le thème en fonction des préférences de l'utilisateur.
     */
    initTheme() {
        this.setTheme(this.getTheme())
    }

    /**
     * Définit le thème de l'application.
     * @param theme Le type de thème à définir.
     */
    setTheme(theme: ThemeType): void {
        // Résout le thème en fonction des préférences de l'utilisateur.
        const resolvedTheme =
            theme === ThemeType.System ? this.getSystemThemePreference() : theme
        document.documentElement.setAttribute('data-theme', resolvedTheme)

        localStorage.setItem(this.THEME_KEY, theme)
    }

    /**
     * Obtient le thème actuel de l'application.
     * @returns Le type de thème actuel.
     */
    getTheme(): ThemeType {
        const storedTheme = localStorage.getItem(this.THEME_KEY)

        if (storedTheme) {
            return storedTheme as ThemeType
        }

        return this.getSystemThemePreference()
    }

    /**
     * Obtient la préférence de thème du système de l'utilisateur.
     * @returns Le type de thème préféré par le système.
     */
    private getSystemThemePreference(): ThemeType {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeType.Dark
            : ThemeType.Light
    }
}
