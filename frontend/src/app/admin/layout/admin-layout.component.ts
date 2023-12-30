import { AsideComponent } from '@admin/components/aside/aside.component'
import { NavbarAdminComponent } from '@admin/components/navbar-admin.component'
import { FormModalsComponent } from '@admin/modal/form-modals.component'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from '@shared/components/footer/footer.component'
import { ModalComponent } from '@shared/components/utility/modals/modal.component'
import { BreadcrumbsComponent } from '@shared/components/widgets/breadcrumbs/breadcrumbs.component'
import { SharedModule } from '@shared/shared.module'

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    template: `
        <!-- MODAL -->
        <app-modal />
        <app-form-modals />
        <!-- DRAWER -->
        <div class="drawer min-h-screen bg-base-100 lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <!-- Page -->
            <div class="drawer-content flex flex-col">
                <!-- Nav Bar -->
                <app-navbar-admin
                    class="sticky top-0 z-10"
                    [headerWide]="true" />
                <!-- Page content -->
                <div
                    class="relative flex grow flex-col justify-between overflow-hidden">
                    <main
                        class="relative flex h-max w-full flex-1 flex-row justify-center overflow-hidden bg-gradient-to-t from-base-100 to-base-200">
                        <main
                            class="relative flex max-w-[100vw] flex-1 flex-col items-start overflow-hidden px-2 pb-4 pt-2 sm:px-4 sm:pb-8 sm:pt-5 md:px-6 md:pb-16 md:pt-10 lg:max-w-[calc(100vw-20rem)] lg:px-16">
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
        FormModalsComponent,
        ModalComponent,
    ],
})
export class AdminLayoutComponent {}
