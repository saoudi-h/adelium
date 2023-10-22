import { Component } from '@angular/core'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component'
import { LandingComponent } from './landing/landing.component'

@Component({
  selector: 'app-home',
  template: '<app-landing class="grow"></app-landing>',
  styleUrls: ['./home.component.sass'],
  standalone: true,
  imports: [NavbarComponent, LandingComponent, FooterComponent],
})
export class HomeComponent {}
