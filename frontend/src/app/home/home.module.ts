import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { HomeLayoutComponent } from './home-layout.component'
import { HomeRoutingModule } from './home-routing.module'

import { MegaMenuComponent } from '@shared/components/navbar/mega-menu.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import { FooterComponent } from './../shared/components/footer/footer.component'

@NgModule({
    declarations: [HomeLayoutComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FooterComponent,
        NavbarComponent,
        MegaMenuComponent,
    ],
})
export class HomeModule {}
