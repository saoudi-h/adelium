import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { LogoWidgetComponent } from '../widgets/logo/logo.component'
import { NavUserWidgetComponent } from '../widgets/nav-user/nav-user.component'
import { NotificatorWidgetComponent } from '../widgets/notificator/notificator.component'
import { SearchWidgetComponent } from '../widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '../widgets/theme-switcher/theme-switcher.component'
import { MegaMenuComponent } from './mega-menu.component'

@Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<header
        class="sticky top-0 z-30 flex h-16 w-full justify-center border-b border-base-300 bg-base-300/50 bg-hero-pattern text-base-content backdrop-blur-lg transition-all duration-100">
        <div [ngClass]="{ container: !headerWide }" class="navbar mx-auto">
            <div class="navbar-start">
                <div class="dropdown">
                    <label
                        for="my-drawer-3"
                        aria-label="open sidebar"
                        class="btn btn-square btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                </div>
                <a
                    class="btn btn-ghost text-xl normal-case"
                    routerLink="/"
                    routerLinkActive="router-link-active"
                    ><div logo-widget></div>
                </a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li tabindex="0">
                        <details>
                            <summary>Parent</summary>
                            <ul
                                class="menu dropdown-content menu-sm left-[-50%] z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow xl:menu-horizontal lg:min-w-max"
                                tabindex="0"
                                megaMenu></ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div class="navbar-end">
                <div theme-switcher-widget></div>
                <div search-widget></div>
                <div notificator-widget></div>
                <div nav-user-widget></div>
            </div>
        </div>
    </header>`,
    imports: [
        CommonModule,
        MegaMenuComponent,
        RouterLink,
        RouterLinkActive,
        ThemeSwitcherWidgetComponent,
        SearchWidgetComponent,
        NotificatorWidgetComponent,
        NavUserWidgetComponent,
        LogoWidgetComponent,
    ],
})
export class NavbarComponent {
    @Input() headerWide = false
}
