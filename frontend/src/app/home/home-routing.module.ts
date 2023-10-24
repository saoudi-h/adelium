import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home-layout.component').then(
                mod => mod.HomeLayoutComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home.component').then(
                        mod => mod.HomeComponent
                    ),
            },
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
            {
                path: '**',
                loadComponent: () =>
                    import('./pages/not-found/not-found.component').then(
                        mod => mod.NotFoundComponent
                    ),
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
