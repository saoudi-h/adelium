import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AuthModule } from '@auth/auth.module'
import { MegaMenuComponent } from '@shared/components/navbar/mega-menu.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import { FooterComponent } from './../shared/components/footer/footer.component'
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FooterComponent,
        NavbarComponent,
        MegaMenuComponent,
        AuthModule,
    ],
})
export class HomeModule {}
