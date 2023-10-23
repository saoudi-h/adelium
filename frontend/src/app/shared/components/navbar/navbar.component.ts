import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { MegaMenuComponent } from './mega-menu.component'
import { NavUserComponent } from './nav-user/nav-user.component'
import { SearchComponent } from './search/search.component'
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component'
@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    ThemeSwitcherComponent,
    MegaMenuComponent,
    RouterLink,
    RouterLinkActive,
    SearchComponent,
    NavUserComponent,
  ],
})
export class NavbarComponent {}
