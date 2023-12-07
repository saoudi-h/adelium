import { AsideComponent } from '@admin/components/aside/aside.component'
import { NavbarAdminComponent } from '@admin/components/navbar-admin.component'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from '@shared/components/footer/footer.component'
import { BreadcrumbsComponent } from '@shared/components/widgets/breadcrumbs/breadcrumbs.component'
import { SharedModule } from '@shared/shared.module'

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    template: `
        <!-- MODAL -->
        <app-modal />
        <!-- DRAWER -->
        <div class="drawer bg-base-100 lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <!-- Page -->
            <div class="drawer-content flex flex-col">
                <!-- Nav Bar -->
                <app-navbar-admin
                    class="sticky top-0 z-10"
                    [headerWide]="true" />
                <!-- Page content -->
                <div
                    class="relative flex min-h-screen flex-col justify-between overflow-hidden">
                    <main
                        class="relative flex h-max w-full flex-1 flex-row justify-center overflow-hidden bg-gradient-to-t from-base-100 to-base-200">
                        <main
                            class="relative flex max-w-[100vw] flex-1 flex-col items-start overflow-hidden px-6 pb-16 pt-10 lg:px-16">
                            <div breadcrumb></div>
                            <router-outlet></router-outlet>
                        </main>
                    </main>
                </div>
            </div>

            <!-- SIDE BAR -->
            <div class="drawer-side z-20">
                <label
                    for="my-drawer-2"
                    aria-label="close sidebar"
                    class="drawer-overlay"></label>
                <app-aside />
            </div>
        </div>
    `,
    styles: [
        `
    .drawer-toggle:checked~.drawer-side>.drawer-overlay
      background-color: #0006
      backdrop-filter: blur(2px)
    `,
    ],
    imports: [
        FooterComponent,
        NavbarAdminComponent,
        RouterModule,
        AsideComponent,
        BreadcrumbsComponent,
        SharedModule,
    ],
})
export class AdminLayoutComponent {}
