import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { menuData } from '@data/menu.data'
import { LogoWidgetComponent } from '../widgets/logo/logo.component'
import { NavUserWidgetComponent } from '../widgets/nav-user/nav-user.component'
import { NotificatorWidgetComponent } from '../widgets/notificator/notificator.component'
import { SearchWidgetComponent } from '../widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '../widgets/theme-switcher/theme-switcher.component'
import { MegaMenuComponent } from './mega-menu.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component'

@Component({
    selector: '[nav-header]',
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
                    logo-widget
                    class="btn btn-ghost text-xl normal-case"
                    routerLink="/"
                    routerLinkActive="router-link-active">
                </a>
            </div>

            <div
                class="navbar-center hidden lg:block"
                nav-menu
                [menu]="menuData"></div>
            <div class="navbar-end">
                <div theme-switcher-widget class="hidden lg:block"></div>
                <div search-widget class="hidden lg:block"></div>
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
        NavMenuComponent,
    ],
})
export class NavHeaderComponent {
    @Input() headerWide = false
    menuData = menuData
}
