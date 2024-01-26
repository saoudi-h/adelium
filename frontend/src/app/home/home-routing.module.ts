import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DefaultLayoutComponent } from '@shared/layouts/default-layout.component'

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home.component').then(
                        mod => mod.HomeComponent
                    ),
                data: {
                    breadcrumb: 'Accueil',
                    icon: 'home-icon',
                    active: true,
                },
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./pages/about/about.component').then(
                        mod => mod.AboutComponent
                    ),
                data: {
                    breadcrumb: 'À propos',
                    icon: 'info-icon',
                    active: true,
                },
            },
            {
                path: 'presentation',
                loadComponent: () =>
                    import('./pages/presentation/presentation.component').then(
                        mod => mod.PresentationComponent
                    ),
                data: {
                    breadcrumb: 'Présentation',
                    icon: 'presentation-icon',
                    active: true,
                },
            },
            {
                path: '**',
                loadComponent: () =>
                    import('./pages/not-found/not-found.component').then(
                        mod => mod.NotFoundComponent
                    ),
                data: {
                    breadcrumb: 'Page introuvable',
                    icon: 'not-found-icon',
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
export class HomeRoutingModule {}
