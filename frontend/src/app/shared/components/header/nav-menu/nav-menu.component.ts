import { Component } from '@angular/core'
import { MenuRecursiveComponent } from './menu-recursive.component'

export interface MenuNode {
    id: string
    label: string
    type: 'button' | 'internal-link' | 'external-link' | 'category'
    icon?: string
    hasSubMenu: boolean
    action?: () => void
    url?: string
    tooltip?: string
    subMenu?: MenuNode[]
}

@Component({
    selector: '[nav-menu]',
    imports: [MenuRecursiveComponent],
    template: `<ul
        menu-recursive
        [menu]="menuFormationInformatique"
        class="flex"></ul>`,
    standalone: true,
})
export class NavMenuComponent {
    menuFormationInformatique: MenuNode[] = [
        {
            id: 'formations',
            label: 'Formations',
            type: 'category',
            hasSubMenu: true,
            icon: 'training-icon',
            tooltip: 'Découvrez nos formations',
            subMenu: [
                {
                    id: 'developpement-web',
                    label: 'Développement Web',
                    type: 'category',
                    hasSubMenu: true,
                    subMenu: [
                        {
                            id: 'front-end',
                            label: 'Front-End (React, Angular, Vue)',
                            type: 'internal-link',
                            url: '/formations/developpement-web/front-end',
                            hasSubMenu: false,
                        },
                        {
                            id: 'back-end',
                            label: 'Back-End (Node.js, Django)',
                            type: 'internal-link',
                            url: '/formations/developpement-web/back-end',
                            hasSubMenu: false,
                        },
                        {
                            id: 'full-stack',
                            label: 'Full Stack Development',
                            type: 'internal-link',
                            url: '/formations/developpement-web/full-stack',
                            hasSubMenu: false,
                        },
                    ],
                },
                {
                    id: 'developpement-mobile',
                    label: 'Développement Mobile',
                    type: 'category',
                    hasSubMenu: true,
                    subMenu: [
                        {
                            id: 'android',
                            label: 'Développement Android (Kotlin)',
                            type: 'internal-link',
                            url: '/formations/developpement-mobile/android',
                            hasSubMenu: false,
                        },
                        {
                            id: 'ios',
                            label: 'Développement iOS (Swift)',
                            type: 'internal-link',
                            url: '/formations/developpement-mobile/ios',
                            hasSubMenu: false,
                        },
                        {
                            id: 'cross-platform',
                            label: 'Cross-platform (Flutter, React Native)',
                            type: 'internal-link',
                            url: '/formations/developpement-mobile/cross-platform',
                            hasSubMenu: false,
                        },
                    ],
                },
                {
                    id: 'langages-de-programmation',
                    label: 'Langages de Programmation',
                    type: 'category',
                    hasSubMenu: true,
                    subMenu: [
                        {
                            id: 'python-debutant',
                            label: 'Python pour les débutants',
                            type: 'internal-link',
                            url: '/formations/langages/python-debutant',
                            hasSubMenu: false,
                        },
                        {
                            id: 'java-avance',
                            label: 'Java Avancé',
                            type: 'internal-link',
                            url: '/formations/langages/java-avance',
                            hasSubMenu: false,
                        },
                        {
                            id: 'javascript-modern',
                            label: 'JavaScript Modern',
                            type: 'internal-link',
                            url: '/formations/langages/javascript-modern',
                            hasSubMenu: false,
                        },
                    ],
                },
                {
                    id: 'bases-de-donnees',
                    label: 'Conception et Développement de Bases de Données',
                    type: 'category',
                    hasSubMenu: true,
                    subMenu: [
                        {
                            id: 'mysql-debutant',
                            label: 'MySQL pour les débutants',
                            type: 'internal-link',
                            url: '/formations/bases-de-donnees/mysql-debutant',
                            hasSubMenu: false,
                        },
                        {
                            id: 'mongodb-avance',
                            label: 'MongoDB Avancé',
                            type: 'internal-link',
                            url: '/formations/bases-de-donnees/mongodb-avance',
                            hasSubMenu: false,
                        },
                        {
                            id: 'optimisation-sql',
                            label: 'Optimisation SQL',
                            type: 'internal-link',
                            url: '/formations/bases-de-donnees/optimisation-sql',
                            hasSubMenu: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'professionnels',
            label: 'Professionnels',
            type: 'category',
            hasSubMenu: true,
            icon: 'business-icon',
            subMenu: [
                {
                    id: 'entreprises',
                    label: 'Pour les Entreprises',
                    type: 'internal-link',
                    url: '/professionnels/entreprises',
                    hasSubMenu: false,
                },
                {
                    id: 'etablissements-publics',
                    label: 'Pour les Établissements Publics',
                    type: 'internal-link',
                    url: '/professionnels/etablissements-publics',
                    hasSubMenu: false,
                },
            ],
        },
        {
            id: 'ressources',
            label: 'Ressources',
            type: 'category',
            hasSubMenu: true,
            icon: 'resources-icon',
            subMenu: [
                {
                    id: 'quiz',
                    label: 'Quiz',
                    type: 'internal-link',
                    url: '/ressources/quiz',
                    hasSubMenu: false,
                },
                {
                    id: 'blog',
                    label: 'Articles de Blog',
                    type: 'internal-link',
                    url: '/ressources/blog',
                    hasSubMenu: false,
                },
                {
                    id: 'tutoriels',
                    label: 'Tutoriels',
                    type: 'internal-link',
                    url: '/ressources/tutoriels',
                    hasSubMenu: false,
                },
            ],
        },
        {
            id: 'a-propos',
            label: 'À propos',
            type: 'category',
            hasSubMenu: true,
            icon: 'about-icon',
            subMenu: [
                {
                    id: 'qui-sommes-nous',
                    label: 'Qui sommes-nous',
                    type: 'internal-link',
                    url: '/a-propos/qui-sommes-nous',
                    hasSubMenu: false,
                },
                {
                    id: 'contact',
                    label: 'Contactez-nous',
                    type: 'internal-link',
                    url: '/a-propos/contact',
                    hasSubMenu: false,
                },
                {
                    id: 'faq',
                    label: 'FAQ',
                    type: 'internal-link',
                    url: '/a-propos/faq',
                    hasSubMenu: false,
                },
            ],
        },
    ]
}