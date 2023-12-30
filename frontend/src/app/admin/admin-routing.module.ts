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
                    breadcrumb: 'Bank généraux',
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
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
