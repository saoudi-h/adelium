import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

/**
 * Theme type
 */
export enum ThemeType {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
}

/**
 * Service for managing the theme of the application.
 * @example
 * // Set the theme to dark
 * this.themeService.setTheme(ThemeType.Dark)
 * @example
 * // Set the theme to light
 * this.themeService.setTheme(ThemeType.Light)
 */
@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    /**
     * The key used to store the theme in the local storage.
     */
    private readonly THEME_KEY = 'color-theme'
    /**
     * The theme subject.
     */
    private themeSubject = new BehaviorSubject<ThemeType>(this.getTheme())

    /**
     * Init the theme of the application.
     *
     * This method should be called in the constructor of the AppComponent.
     */
    initTheme() {
        this.setTheme(this.getTheme())
    }

    /**
     * Defines the theme of the application.
     * @param theme The theme to set.
     */
    setTheme(theme: ThemeType): void {
        // Résout le thème en fonction des préférences de l'utilisateur.
        const resolvedTheme =
            theme === ThemeType.System ? this.getSystemThemePreference() : theme
        document.documentElement.setAttribute('data-theme', resolvedTheme)

        localStorage.setItem(this.THEME_KEY, theme)
        this.themeSubject.next(theme)
    }

    /**
     * Gets the current theme of the application.
     *
     * @returns The current theme of the application.
     */
    getTheme(): ThemeType {
        const storedTheme = localStorage.getItem(this.THEME_KEY)

        if (storedTheme) {
            return storedTheme as ThemeType
        }

        return this.getSystemThemePreference()
    }

    /**
     * Gets the theme changes observable.
     * @returns The theme changes observable.
     */
    get themeChanges() {
        return this.themeSubject.asObservable()
    }

    /**
     * Gets the system theme preference.
     * @returns The system theme preference.
     */
    private getSystemThemePreference(): ThemeType {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeType.Dark
            : ThemeType.Light
    }
}
