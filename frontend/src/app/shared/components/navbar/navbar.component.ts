import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { LogoComponent } from '../logo/logo.component'
import { MegaMenuComponent } from './mega-menu.component'
import { WidgetsComponent } from './widgets/widgets.component'
@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    imports: [
        CommonModule,
        MegaMenuComponent,
        RouterLink,
        RouterLinkActive,
        WidgetsComponent,
        LogoComponent,
    ],
})
export class NavbarComponent {}
