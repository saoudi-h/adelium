import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { menuData } from '@data/menu.data'
import { LogoWidgetComponent } from '@shared/components/widgets/logo/logo.component'
import { SearchWidgetComponent } from '@shared/components/widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '@shared/components/widgets/theme-switcher/theme-switcher.component'
import { MenuNode } from '../header/nav-menu/nav-menu.component'
import { MenuAsideFrontComponent } from './menu-aside-front.component'

@Component({
    standalone: true,
    selector: '[aside-front]',
    imports: [
        CommonModule,
        LogoWidgetComponent,
        ThemeSwitcherWidgetComponent,
        SearchWidgetComponent,
        RouterLink,
        RouterLinkActive,
        MenuAsideFrontComponent,
    ],
    template: `
        <aside
            class="block min-h-screen w-80 border-r border-base-content/10 bg-gradient-to-t from-base-100 to-base-300">
            <!-- aside header -->
            <div class="navbar">
                <div class="navbar-start">
                    <a
                        class="btn btn-ghost text-xl normal-case"
                        routerLink="/"
                        routerLinkActive="router-link-active">
                        <!-- logo widget -->
                        <div logo-widget></div>
                    </a>
                </div>
                <div class="navbar-end">
                    <!-- theme switcher widget -->
                    <div theme-switcher-widget></div>
                </div>
            </div>
            <div class="navbar">
                <div class="navbar-end"></div>
                <div class="navbar-end">
                    <!-- search widget -->
                    <div search-widget [alwaysOpen]="true" width="19rem"></div>
                </div>
            </div>
            <ul
                menu-aside-front
                [menu]="menu"
                class="flex flex-col gap-2 px-2 py-2"></ul>
        </aside>
    `,
})
export class AsideFrontComponent {
    menu: MenuNode[] = menuData
}
