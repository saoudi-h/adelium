import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import * as AppActions from '@store/app/app.actions'
import { of } from 'rxjs'
import { concatMap, filter, map, tap } from 'rxjs/operators'
import * as themeActions from './theme.actions'
import * as ThemeSelectors from './theme.selectors'
import { AppRoute, SystemTheme, ThemeChoice } from './theme.types'
@Injectable()
export class ThemeEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private readonly store: Store<AppState>
    ) {}

    // Effet pour initialiser le thème au démarrage de l'application
    initTheme$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.appInit),
            concatLatestFrom(() => [
                this.store.select(ThemeSelectors.selectUserThemeChoice),
                this.store.select(ThemeSelectors.selectSystemThemePreference),

                // this.store.select(ThemeSelectors.selectUserThemeChoice),
                // this.store.select(ThemeSelectors.selectSystemThemePreference),
            ]),
            concatMap(([, userChoice, systemPreference]) => {
                const storedThemeChoice =
                    (localStorage.getItem(
                        'user-theme-choice'
                    ) as ThemeChoice) || userChoice
                const storedSystemPreference =
                    (window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? SystemTheme.Dark
                        : SystemTheme.Light) || systemPreference

                return of(
                    themeActions.setSystemThemePreference({
                        preference: storedSystemPreference,
                    }),
                    themeActions.setUserThemeChoice({
                        choice: storedThemeChoice,
                    })
                )
            })
        )
    })

    // Effet pour sauvegarder le choix du thème dans le localStorage
    saveThemeChoiceToLocalStorage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(themeActions.setUserThemeChoice),
                tap(action =>
                    localStorage.setItem('user-theme-choice', action.choice)
                )
            )
        },
        { dispatch: false }
    )

    updateDaisyUITheme$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(themeActions.setUserThemeChoice),
                concatLatestFrom(() => [
                    this.store.select(ThemeSelectors.selectUserThemeChoice),
                    this.store.select(
                        ThemeSelectors.selectSystemThemePreference
                    ),
                    this.store.select(ThemeSelectors.selectCurrentRoute),
                ]),
                tap(([, userChoice, systemPreference, currentRoute]) => {
                    const resolvedTheme = this.resolveDaisyUITheme(
                        userChoice,
                        systemPreference,
                        currentRoute
                    )
                    document.documentElement.setAttribute(
                        'data-theme',
                        resolvedTheme
                    )
                })
            )
        },
        { dispatch: false }
    )

    private resolveDaisyUITheme(
        userChoice: ThemeChoice,
        systemPreference: SystemTheme,
        currentRoute: AppRoute
    ): string {
        const isDarkMode =
            userChoice === ThemeChoice.System
                ? systemPreference === SystemTheme.Dark
                : userChoice === ThemeChoice.Dark
        const themePrefix = currentRoute === AppRoute.Admin ? 'admin-' : ''
        return `${themePrefix}${isDarkMode ? 'dark' : 'light'}`
    }

    // Effet pour ajuster le thème en fonction de la route
    adjustThemeForRoute$ = createEffect(() => {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => {
                const isAdminRoute = (event as NavigationEnd).url.includes(
                    '/admin'
                )
                const route = isAdminRoute ? AppRoute.Admin : AppRoute.Public
                return themeActions.setRoute({ route })
            })
        )
    })
}
