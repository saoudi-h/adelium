import { AdminLayoutComponent } from '@admin/layout/admin-layout.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { adminGuard } from '@auth/guards/admin.guard'

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home.component').then(
                        mod => mod.AdminHomeComponent
                    ),
                data: {
                    breadcrumb: 'Administration',
                    icon: 'admin-icon',
                    active: true,
                },
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/auth/users/users.component').then(
                        mod => mod.AdminUsersComponent
                    ),
                data: {
                    breadcrumb: 'Utilisateurs',
                    icon: 'users-icon',
                    active: true,
                },
            },
            {
                path: 'roles',
                loadComponent: () =>
                    import('./pages/auth/roles/roles.component').then(
                        mod => mod.AdminRolesComponent
                    ),
                data: {
                    breadcrumb: 'Utilisateurs',
                    icon: 'role-icon',
                    active: true,
                },
            },
            {
                path: 'authorities',
                loadComponent: () =>
                    import(
                        './pages/auth/authorities/authorities.component'
                    ).then(mod => mod.AdminAuthoritiesComponent),
                data: {
                    breadcrumb: 'Autorités',
                    icon: 'authority-icon',
                    active: true,
                },
            },
            {
                path: 'quiz-default',
                loadComponent: () =>
                    import(
                        './pages/evaluations/quiz/quiz-default/quiz-default.component'
                    ).then(mod => mod.AdminQuizDefaultComponent),
                data: {
                    breadcrumb: 'Quiz généraux',
                    icon: 'quiz-icon',
                    active: true,
                },
            },
            {
                path: 'quiz-mcq',
                loadComponent: () =>
                    import(
                        './pages/evaluations/quiz/quiz-mcq/quiz-mcq.component'
                    ).then(mod => mod.AdminQuizMcqComponent),
                data: {
                    breadcrumb: 'Quiz à choix multiples',
                    icon: 'quiz-icon',
                    active: true,
                },
            },
            {
                path: 'bank-default',
                loadComponent: () =>
                    import(
                        './pages/evaluations/bank/bank-default/bank-default.component'
                    ).then(mod => mod.AdminBankDefaultComponent),
                data: {
                    breadcrumb: 'Banques générales',
                    icon: 'bank-icon',
                    active: true,
                },
            },
            {
                path: 'tag',
                loadComponent: () =>
                    import('./pages/evaluations/tag/tag.component').then(
                        mod => mod.AdminTagComponent
                    ),
                data: {
                    breadcrumb: 'Tags',
                    icon: 'tag-icon',
                    active: true,
                },
            },
            {
                path: 'question-mcq',
                loadComponent: () =>
                    import(
                        './pages/evaluations/question/question-mcq/question-mcq.component'
                    ).then(mod => mod.AdminQuestionMcqComponent),
                data: {
                    breadcrumb: 'Questions à choix multiples',
                    icon: 'question-icon',
                    active: true,
                },
            },
            {
                path: 'question-true-false',
                loadComponent: () =>
                    import(
                        './pages/evaluations/question/question-true-false/question-true-false.component'
                    ).then(mod => mod.AdminQuestionTrueFalseComponent),
                data: {
                    breadcrumb: 'Questions vrai ou faux',
                    icon: 'question-icon',
                    active: true,
                },
            },
            {
                path: 'option-mcq',
                loadComponent: () =>
                    import(
                        './pages/evaluations/option/option-mcq/option-mcq.component'
                    ).then(mod => mod.AdminOptionMcqComponent),
                data: {
                    breadcrumb: 'Options à choix multiples',
                    icon: 'option-icon',
                    active: true,
                },
            },
            {
                path: 'option-true-false',
                loadComponent: () =>
                    import(
                        './pages/evaluations/option/option-true-false/option-true-false.component'
                    ).then(mod => mod.AdminOptionTrueFalseComponent),
                data: {
                    breadcrumb: 'Options vrai ou faux',
                    icon: 'option-icon',
                    active: true,
                },
            },
            {
                path: 'media-text',
                loadComponent: () =>
                    import(
                        './pages/evaluations/media/media-text/media-text.component'
                    ).then(mod => mod.AdminMediaTextComponent),
                data: {
                    breadcrumb: 'Médias textuels',
                    icon: 'media-icon',
                    active: true,
                },
            },
            {
                path: 'media-boolean',
                loadComponent: () =>
                    import(
                        './pages/evaluations/media/media-boolean/media-boolean.component'
                    ).then(mod => mod.AdminMediaBooleanComponent),
                data: {
                    breadcrumb: 'Médias booléens',
                    icon: 'media-icon',
                    active: true,
                },
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
