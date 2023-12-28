import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { LogoWidgetComponent } from '@shared/components/widgets/logo/logo.component'
import { SearchWidgetComponent } from '@shared/components/widgets/search/search.component'
import { ThemeSwitcherWidgetComponent } from '@shared/components/widgets/theme-switcher/theme-switcher.component'
import { MenuAsideComponent } from './menu.component'

export interface MenuItem {
    type: 'menu' | 'link' | 'button'
    id: string
    text: string
    adminOnly: boolean
    icon: string
    link?: string
    subMenuItems?: MenuItem[]
    action?: () => void
}

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
        RouterLinkActive,
        MenuAsideComponent,
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
                menu-aside
                [menuItems]="menuItems"
                class="menu menu-xs w-full"></ul>
        </aside>
    `,
})
export class AsideComponent {
    constructor(private authSerivce: AuthService) {}
    menuItems: MenuItem[] = [
        {
            type: 'menu',
            id: 'AuthManagement',
            text: "Gestion de l'authentification",
            adminOnly: true,
            icon: 'auth-icon',
            subMenuItems: [
                {
                    type: 'link',
                    id: 'users',
                    link: '/admin/users',
                    text: 'Utilisateurs',
                    adminOnly: true,
                    icon: 'users-icon',
                },
                {
                    type: 'link',
                    id: 'roles',
                    link: '/admin/roles',
                    text: 'Rôles',
                    adminOnly: true,
                    icon: 'role-icon',
                },
                {
                    type: 'link',
                    id: 'authorities',
                    link: '/admin/authorities',
                    text: 'Permissions',
                    adminOnly: true,
                    icon: 'authority-icon',
                },
            ],
        },
        {
            type: 'menu',
            id: 'assessment',
            text: 'Évaluations',
            adminOnly: false,
            icon: 'assessment-icon',
            subMenuItems: [
                {
                    type: 'menu',
                    id: 'quiz',
                    text: 'Quiz',
                    adminOnly: false,
                    icon: 'quiz-icon',
                    subMenuItems: [
                        {
                            type: 'link',
                            id: 'quizDefault',
                            link: '/admin/quiz-default',
                            text: 'Quiz généraux',
                            adminOnly: false,
                            icon: 'quiz-icon',
                        },
                    ],
                },
                {
                    type: 'link',
                    id: 'questions',
                    link: '/admin/questions',
                    text: 'Questions',
                    adminOnly: false,
                    icon: 'question-icon',
                },
                {
                    type: 'link',
                    id: 'options',
                    link: '/admin/options',
                    text: 'Options',
                    adminOnly: false,
                    icon: 'option-icon',
                },
                {
                    type: 'link',
                    id: 'banks',
                    link: '/admin/banks',
                    text: 'Banque de questions',
                    adminOnly: false,
                    icon: 'bank-icon',
                },
            ],
        },
        {
            type: 'link',
            id: 'courseManagement',
            link: '/admin/course-management',
            text: 'Gestion des cours',
            adminOnly: true,
            icon: 'courses-icon',
        },
        {
            type: 'link',
            id: 'categories',
            link: '/admin/categories',
            text: 'Catégories',
            adminOnly: true,
            icon: 'categories-icon',
        },
        {
            type: 'link',
            id: 'groups',
            link: '/admin/groups',
            text: 'Groupes',
            adminOnly: true,
            icon: 'groups-icon',
        },
        {
            type: 'link',
            id: 'trainingManagement',
            link: '/admin/training-management',
            text: 'Gestion des formations',
            adminOnly: false,
            icon: 'training-management-icon',
        },
        {
            type: 'link',
            id: 'reports',
            link: '/admin/reports',
            text: 'Rapports',
            adminOnly: false,
            icon: 'reports-icon',
        },
        {
            type: 'link',
            id: 'announcements',
            link: '/admin/announcements',
            text: 'Annonces',
            adminOnly: false,
            icon: 'announcements-icon',
        },
        {
            type: 'link',
            id: 'settings',
            link: '/admin/settings',
            text: 'Paramètres',
            adminOnly: false,
            icon: 'settings-icon',
        },
        {
            type: 'button',
            id: 'logout',
            action: () => this.authSerivce.logout(),
            text: 'Se déconnecter',
            adminOnly: true,
            icon: 'logout-icon',
        },
    ]
}
