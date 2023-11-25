import { ThemeService, ThemeType } from '@/core/services/theme.service'
import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { SvgMoonComponent } from '@shared/components/icons/moon.component'
import { SvgSunComponent } from '@shared/components/icons/sun.component'
import { SvgSystemComponent } from '@shared/components/icons/system.component'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'

@Component({
    selector: 'app-theme-switcher',
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
export class ThemeSwitcherComponent implements OnInit {
    @ViewChild(DropdownComponent) dropdown!: DropdownComponent
    selectedTheme: ThemeType = ThemeType.System

    themes: { theme: ThemeType; label: string; component: unknown }[] = [
        { theme: ThemeType.Light, label: 'Light', component: SvgSunComponent },
        { theme: ThemeType.Dark, label: 'Dark', component: SvgMoonComponent },
        {
            theme: ThemeType.System,
            label: 'System',
            component: SvgSystemComponent,
        },
    ]

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.selectedTheme = this.themeService.getTheme()
    }

    setTheme(event: Event, theme: ThemeType): void {
        event.stopPropagation()
        this.selectedTheme = theme
        this.themeService.setTheme(theme)
    }
}
