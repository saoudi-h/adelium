import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MegaMenuComponent } from '@shared/components/navbar/mega-menu.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import { FooterComponent } from './../shared/components/footer/footer.component'
import { HomeRoutingModule } from './home-routing.module'
@Component({
    selector: 'app-home-layout',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        HomeRoutingModule,
        MegaMenuComponent,
    ],
    template: `
        <div class="drawer">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <!-- Page -->
            <div class="drawer-content flex flex-col">
                <!-- Nav Bar -->
                <app-navbar class="sticky top-0 z-30" />
                <!-- Page content -->
                <div
                    class="relative flex min-h-screen flex-col justify-between overflow-hidden">
                    <main
                        class="relative flex h-max w-full flex-1 content-center items-center justify-center overflow-hidden bg-gradient-to-t from-base-100 to-base-300">
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
})
export class HomeLayoutComponent {}
