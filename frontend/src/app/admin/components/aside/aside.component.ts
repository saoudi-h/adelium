import * as AuthSelectors from '@/store/auth/auth.selectors'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { IconService } from '@core/services/icon.service'
import { Store } from '@ngrx/store'
import { LogoWidgetComponent } from '@shared/components/widgets/logo/logo.component'
import { SearchWidgetComponent } from '@shared/components/widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '@shared/components/widgets/theme-switcher/theme-switcher.component'
import { Observable } from 'rxjs'
@Component({
    standalone: true,
    selector: 'app-aside',
    styleUrl: 'aside.component.sass',
    imports: [
        CommonModule,
        LogoWidgetComponent,
        ThemeSwitcherWidgetComponent,
        SearchWidgetComponent,
        RouterLink,
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
            <ul class="menu menu-xs w-full">
                <!-- aside body -->
                @for (item of menuItems; track item) {
                    @if (
                        !item.adminOnly ||
                        (item.adminOnly && (isAdmin$ | async))
                    ) {
                        <li>
                            @if (item.isButton) {
                                <button
                                    (click)="item.action()"
                                    class="justify-between">
                                    <div class="h-10 w-10 p-2">
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    </div>
                                    <span> {{ item.text }} </span>
                                </button>
                            } @else {
                                <a
                                    [routerLink]="item.link"
                                    class="justify-between">
                                    <div class="h-9 w-9 p-2">
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    </div>
                                    <span> {{ item.text }} </span>
                                </a>
                            }
                        </li>
                    }
                }
            </ul>
        </aside>
    `,
})
export class AsideComponent {
    isAdmin$: Observable<boolean>

    constructor(
        private iconService: IconService,
        private store: Store,
        private authSerivce: AuthService
    ) {
        this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getIconComponent(iconName: string): any {
        return this.iconService.getIconComponent(iconName)
    }

    menuItems = [
        {
            id: 'userManagement',
            link: '/admin/users',
            text: 'Gestion des utilisateurs',
            adminOnly: true,
            icon: 'users-icon', // Exemple de nom d'icône, à remplacer par vos propres icônes
        },
        {
            id: 'courseManagement',
            link: '/admin/course-management',
            text: 'Gestion des cours',
            adminOnly: true,
            icon: 'courses-icon',
        },
        {
            id: 'categories',
            link: '/admin/categories',
            text: 'Catégories',
            adminOnly: true,
            icon: 'categories-icon',
        },
        {
            id: 'groups',
            link: '/admin/groups',
            text: 'Groupes',
            adminOnly: true,
            icon: 'groups-icon',
        },
        {
            id: 'assessment',
            link: '/admin/assessment',
            text: 'Évaluations',
            adminOnly: true,
            icon: 'assessment-icon',
        },
        {
            id: 'questionBank',
            link: '/admin/question-bank',
            text: 'Banque de questions',
            adminOnly: true,
            icon: 'bank-icon',
        },
        {
            id: 'trainingManagement',
            link: '/admin/training-management',
            text: 'Gestion des formations',
            adminOnly: false,
            icon: 'training-management-icon',
        },
        {
            id: 'reports',
            link: '/admin/reports',
            text: 'Rapports',
            adminOnly: false,
            icon: 'reports-icon',
        },
        {
            id: 'announcements',
            link: '/admin/announcements',
            text: 'Annonces',
            adminOnly: false,
            icon: 'announcements-icon',
        },
        {
            id: 'settings',
            link: '/admin/settings',
            text: 'Paramètres',
            adminOnly: false,
            icon: 'settings-icon',
        },
        {
            id: 'logout',
            isButton: true,
            action: () => this.authSerivce.logout(),
            text: 'Se déconnecter',
            adminOnly: true,
            icon: 'logout-icon',
        },
    ]
}
