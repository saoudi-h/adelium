import { FooterComponent } from './../shared/components/footer/footer.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeRoutingModule } from './home-routing.module'
@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, HomeRoutingModule],
  template: `
    <div class="flex flex-col min-h-screen justify-between">
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
})
export class HomeLayoutComponent {}
