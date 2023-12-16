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
                    import('./pages/users/users.component').then(
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
                    import('./pages/roles/roles.component').then(
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
                    import('./pages/authorities/authorities.component').then(
                        mod => mod.AdminAuthoritiesComponent
                    ),
                data: {
                    breadcrumb: 'Autorités',
                    icon: 'authority-icon',
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
