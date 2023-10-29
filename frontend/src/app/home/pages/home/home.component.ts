import { Component, inject } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component'
import { LandingComponent } from './landing/landing.component'

@Component({
    selector: 'app-home',
    template: `
        <app-landing class="grow"></app-landing>
        <button class="btn btn-circle" (click)="test()">T</button>
    `,
    styleUrls: ['./home.component.sass'],
    standalone: true,
    imports: [NavbarComponent, LandingComponent, FooterComponent],
})
export class HomeComponent {
    authService = inject(AuthService)
    test() {
        const res = this.authService.hasTokenExpired()
        console.log('is token expired : ', res)
    }
}
