import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DefaultLayoutComponent } from '@shared/layouts/default-layout.component'
import { notAuthGuard } from './guards/not-auth.guard'

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        canActivate: [notAuthGuard],
        children: [
            {
                path: 'login/oauth2/code/:provider',
                loadComponent: () =>
                    import('./pages/login/oauth-callback.component').then(
                        mod => mod.OauthCallbackComponent
                    ),
                data: {
                    breadcrumb: 'OAuth',
                    icon: 'oauth-icon',
                    active: true,
                },
            },
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(
                        mod => mod.LoginComponent
                    ),
                data: {
                    breadcrumb: 'Authentication',
                    icon: 'login-icon',
                    active: true,
                },
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(
                        mod => mod.RegisterComponent
                    ),
                data: {
                    breadcrumb: 'Inscription',
                    icon: 'register-icon',
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
export class AuthRoutingModule {}
