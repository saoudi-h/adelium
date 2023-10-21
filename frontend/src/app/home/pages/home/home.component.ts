import { Component } from '@angular/core'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { LandingComponent } from '../../../shared/components/landing/landing.component'
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component'

@Component({
  selector: 'app-home',
  template: '<app-landing></app-landing>',
  standalone: true,
  imports: [NavbarComponent, LandingComponent, FooterComponent],
})
export class HomeComponent {}
