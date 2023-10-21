import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { NavbarComponent } from '../shared/components/navbar/navbar.component'
import { FooterComponent } from './../shared/components/footer/footer.component'
import { HomeRoutingModule } from './home-routing.module'
@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, HomeRoutingModule],
  template: `
    <div class="relative flex min-h-screen flex-col justify-between overflow-hidden">
      <app-navbar></app-navbar>
      <main
        class="relative mt-20 flex h-max w-full flex-1 content-center items-center justify-center overflow-hidden bg-gradient-to-t from-base-100 to-base-300">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class HomeLayoutComponent {}
