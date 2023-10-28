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
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(
                        mod => mod.LoginComponent
                    ),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(
                        mod => mod.RegisterComponent
                    ),
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
