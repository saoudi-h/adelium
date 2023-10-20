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
      <main
        class="bg-base-200 w-full h-max flex-1 mt-20 flex items-center justify-center content-center">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class HomeLayoutComponent {}
