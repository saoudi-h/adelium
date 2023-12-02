import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { SvgMoonComponent } from '@shared/components/icons/moon.component'
import { SvgSunComponent } from '@shared/components/icons/sun.component'
import { SvgSystemComponent } from '@shared/components/icons/system.component'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { setUserThemeChoice } from '@store/theme/theme.actions'
import { selectUserThemeChoice } from '@store/theme/theme.selectors'
import { ThemeChoice } from '@store/theme/theme.types'
import { Observable } from 'rxjs'

@Component({
    selector: '[theme-switcher-widget]',
    standalone: true,
    imports: [
        CommonModule,
        SvgSunComponent,
        SvgMoonComponent,
        SvgSystemComponent,
        DropdownComponent,
    ],
    templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherWidgetComponent implements OnInit {
    selectedCurrentTheme$!: Observable<ThemeChoice>

    @ViewChild(DropdownComponent) dropdown!: DropdownComponent

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    themes: { theme: ThemeChoice; label: string; component: any }[] = [
        {
            theme: ThemeChoice.Light,
            label: 'Light',
            component: SvgSunComponent,
        },
        { theme: ThemeChoice.Dark, label: 'Dark', component: SvgMoonComponent },
        {
            theme: ThemeChoice.System,
            label: 'System',
            component: SvgSystemComponent,
        },
    ]

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        // eslint-disable-next-line @ngrx/prefer-selector-in-select
        this.selectedCurrentTheme$ = this.store.select(selectUserThemeChoice)
    }

    setTheme(event: Event, theme: ThemeChoice): void {
        event.stopPropagation()
        this.store.dispatch(setUserThemeChoice({ choice: theme }))
    }
}
