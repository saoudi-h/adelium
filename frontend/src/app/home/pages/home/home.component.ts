import { Component } from '@angular/core'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { LandingComponent } from './landing/landing.component'

@Component({
    selector: 'app-home',
    template: ` <app-landing class="grow"></app-landing>`,
    styleUrls: ['./home.component.sass'],
    standalone: true,
    imports: [LandingComponent, FooterComponent],
})
export class HomeComponent {}
