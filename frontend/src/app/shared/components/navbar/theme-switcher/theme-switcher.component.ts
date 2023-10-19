import { ThemeService, ThemeType } from '@/core/services/theme.service'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SvgSunComponent } from '@shared/components/icons/sun.component'
import { SvgMoonComponent } from '@shared/components/icons/moon.component'
import { SvgSystemComponent } from '@shared/components/icons/system.component'

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, SvgSunComponent, SvgMoonComponent, SvgSystemComponent],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {
  selectedTheme: ThemeType = ThemeType.System

  themes: { theme: ThemeType; label: string; component: unknown }[] = [
    { theme: ThemeType.Light, label: 'Light', component: SvgSunComponent },
    { theme: ThemeType.Dark, label: 'Dark', component: SvgMoonComponent },
    { theme: ThemeType.System, label: 'System', component: SvgSystemComponent },
  ]

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.selectedTheme = this.themeService.getTheme()
  }

  setTheme(theme: ThemeType): void {
    this.selectedTheme = theme
    this.themeService.setTheme(theme)
  }
}
