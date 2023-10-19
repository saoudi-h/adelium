import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component'
import { MegaMenuComponent } from './mega-menu.component'
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, ThemeSwitcherComponent, MegaMenuComponent],
})
export class NavbarComponent {}
