import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'

/**
 * Theme type
 */
export enum ThemeType {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
    AdminDark = 'admin-dark',
    AdminLight = 'admin-light',
    AdminSystem = 'admin-system',
}

/**
 * Theme property.
 */
type ThemeProperty = {
    type: 'dark' | 'light' | 'system'
    name: string
    route: string
}

/**
 * Theme properties.
 */
export const ThemeProperties: Record<ThemeType, ThemeProperty> = {
    [ThemeType.Dark]: { type: 'dark', name: 'dark', route: '*' },
    [ThemeType.Light]: { type: 'light', name: 'light', route: '*' },
    [ThemeType.System]: { type: 'system', name: 'system', route: '*' },
    [ThemeType.AdminDark]: {
        type: 'dark',
        name: 'admin-dark',
        route: '/admin',
    },
    [ThemeType.AdminLight]: {
        type: 'light',
        name: 'admin-light',
        route: '/admin',
    },
    [ThemeType.AdminSystem]: {
        type: 'system',
        name: 'admin-system',
        route: '/admin',
    },
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
    isAdminRoute: boolean = false
    constructor(private router: Router) {
        this.listenToRouteChanges()
    }

    private listenToRouteChanges() {
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.isAdminRoute = event.url.includes('/admin')
                this.adjustThemeForRoute()
            })
    }

    /**
     * Adjust the theme for the current route.
     *
     * @returns The adjusted theme.
     */
    private adjustThemeForRoute() {
        const currentTheme = this.getTheme()
        const currentThemeProperties = ThemeProperties[currentTheme]
        if (this.isAdminRoute && currentThemeProperties.route === '/admin')
            return

        // Route changed, adjust theme
        this.setThemeWithoutRoute(currentTheme)
    }

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
        const resolvedTheme = this.themeSystemResolver(theme)
        const resolvedThemeProperties: ThemeProperty =
            ThemeProperties[resolvedTheme]

        document.documentElement.setAttribute('data-theme', resolvedTheme)

        localStorage.setItem(this.THEME_KEY, resolvedThemeProperties.type)
        this.themeSubject.next(resolvedThemeProperties.type as ThemeType)
    }

    /**
     * Defines the theme of the application without route.
     *
     * @param theme The theme to set.
     */
    setThemeWithoutRoute(theme: ThemeType): void {
        theme = this.themeRouteResolver(theme)
        this.setTheme(theme)
    }

    /**
     * Resolves the theme to admin or not admin if the theme is set to system.
     * @param theme The theme to resolve.
     * @returns The resolved theme.
     */
    themeRouteResolver(theme: ThemeType): ThemeType {
        const currentThemeProperties = ThemeProperties[theme]
        let newTheme: ThemeType

        if (this.isAdminRoute) {
            newTheme =
                currentThemeProperties.type === 'dark'
                    ? ThemeType.AdminDark
                    : currentThemeProperties.type === 'light'
                      ? ThemeType.AdminLight
                      : ThemeType.AdminSystem
        } else {
            newTheme =
                currentThemeProperties.type === 'dark'
                    ? ThemeType.Dark
                    : currentThemeProperties.type === 'light'
                      ? ThemeType.Light
                      : ThemeType.System
        }
        return newTheme
    }

    /**
     * Resolves the theme to dark or light if the theme is set to system.
     * @param theme The theme to resolve.
     * @returns The resolved theme.
     */
    themeSystemResolver(theme: ThemeType) {
        let resolvedTheme: ThemeType =
            theme === ThemeType.System ? this.getSystemThemePreference() : theme
        if (theme === ThemeType.AdminSystem) {
            const temp = this.getSystemThemePreference()
            resolvedTheme =
                temp === ThemeType.Dark
                    ? ThemeType.AdminDark
                    : ThemeType.AdminLight
        }
        return resolvedTheme
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
