import { Component } from '@angular/core'
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component'
import { LandingComponent } from '../../../shared/components/landing/landing.component'
import { FooterComponent } from '../../../shared/components/footer/footer.component'

@Component({
  selector: 'app-home',
  template: '<app-landing></app-landing>',
  standalone: true,
  imports: [NavbarComponent, LandingComponent, FooterComponent],
})
export class HomeComponent {}
