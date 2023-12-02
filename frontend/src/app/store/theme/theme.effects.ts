import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { of } from 'rxjs'
import { concatMap, filter, map, tap } from 'rxjs/operators'
import * as themeActions from './theme.actions'
import * as fromThemes from './theme.selectors'
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
            ofType(themeActions.initTheme),
            concatLatestFrom(() => [
                this.store.select(fromThemes.selectUserThemeChoice),
                this.store.select(fromThemes.selectSystemThemePreference),

                // this.store.select(fromThemes.selectUserThemeChoice),
                // this.store.select(fromThemes.selectSystemThemePreference),
            ]),
            concatMap(([, userChoice, systemPreference]) => {
                console.log(
                    '\ninitTheme$ :\n',
                    'userChoice : ',
                    userChoice,
                    '\nsystemPreference : ',
                    systemPreference
                )
                const storedThemeChoice =
                    (localStorage.getItem(
                        'user-theme-choice'
                    ) as ThemeChoice) || userChoice
                const storedSystemPreference =
                    (window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? SystemTheme.Dark
                        : SystemTheme.Light) || systemPreference

                console.log(
                    'initTheme$ :\n',
                    'storedThemeChoice : ',
                    storedThemeChoice,
                    '\nstoredSystemPreference : ',
                    storedSystemPreference
                )
                console.log(storedThemeChoice)
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
            console.log('ThemeEffects.saveThemeChoiceToLocalStorage$')
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
            console.log('ThemeEffects.updateDaisyUITheme$')
            return this.actions$.pipe(
                ofType(themeActions.setUserThemeChoice),
                concatLatestFrom(() => [
                    this.store.select(fromThemes.selectUserThemeChoice),
                    this.store.select(fromThemes.selectSystemThemePreference),
                    this.store.select(fromThemes.selectCurrentRoute),
                ]),
                tap(([, userChoice, systemPreference, currentRoute]) => {
                    console.log(
                        '\nuserChoice : ',
                        userChoice,
                        '\nsystemPreference : ',
                        systemPreference,
                        '\ncurrentRoute : ',
                        currentRoute
                    )
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
        console.log('ThemeEffects.adjustThemeForRoute$')
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
