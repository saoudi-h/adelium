import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then(m => m.AdminModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./home/home.module').then(m => m.HomeModule),
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
