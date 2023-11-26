import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NavUserWidgetComponent } from '@shared/components/navbar/widgets/nav-user/nav-user.component'
import { NotificatorWidgetComponent } from '@shared/components/navbar/widgets/notificator/notificator.component'
import { SearchWidgetComponent } from '@shared/components/navbar/widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '@shared/components/navbar/widgets/theme-switcher/theme-switcher.component'
import { MegaMenuComponent } from '../../shared/components/navbar/mega-menu.component'
import { LogoWidgetComponent } from '../../shared/components/navbar/widgets/logo/logo.component'

@Component({
    selector: 'app-navbar-admin',
    standalone: true,
    template: `<header
        class="sticky top-0 z-30 flex h-16 w-full justify-center border-b border-base-content/10 bg-base-300 text-base-content backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)]">
        <div [ngClass]="{ container: !headerWide }" class="navbar mx-auto">
            <div class="navbar-start">
                <div class="dropdown">
                    <label
                        for="my-drawer-2"
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
                    class="btn btn-ghost text-xl normal-case lg:hidden"
                    routerLink="/"
                    routerLinkActive="router-link-active"
                    ><div logo-widget></div>
                </a>
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
export class NavbarAdminComponent {
    @Input() headerWide = false
}
