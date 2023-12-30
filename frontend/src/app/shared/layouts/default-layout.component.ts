import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from '@shared/components/footer/footer.component'
import { MegaMenuComponent } from '@shared/components/navbar/mega-menu.component'
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { ModalComponent } from '@shared/components/utility/modals/modal.component'
import { BreadcrumbsComponent } from '@shared/components/widgets/breadcrumbs/breadcrumbs.component'
import { SharedModule } from '@shared/shared.module'

@Component({
    selector: 'app-default-layout',
    standalone: true,
    template: `
        <!-- MODAL -->
        <app-modal />
        <!-- DRAWER -->
        <div class="drawer min-h-screen bg-base-300">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <!-- Page -->
            <div class="drawer-content flex flex-col">
                <!-- Nav Bar -->
                <app-navbar class="sticky top-0 z-30" />
                <!-- Page content -->
                <div
                    class="relative flex grow flex-col justify-between overflow-hidden">
                    <main
                        class="relative flex h-max w-full flex-1 content-center items-center justify-center overflow-hidden bg-gradient-to-t from-base-100 to-base-300">
                        <!-- <div breadcrumb></div> -->
                        <router-outlet></router-outlet>
                    </main>
                    <app-footer></app-footer>
                </div>
            </div>

            <!-- SIDE BAR -->
            <div class="drawer-side z-40">
                <label
                    for="my-drawer-3"
                    aria-label="close sidebar"
                    class="drawer-overlay"></label>
                <ul class="menu min-h-full w-80 bg-base-200 p-4" megaMenu></ul>
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
        NavbarComponent,
        RouterModule,
        MegaMenuComponent,
        BreadcrumbsComponent,
        SharedModule,
        ModalComponent,
    ],
})
export class DefaultLayoutComponent {}
