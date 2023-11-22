import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { UserToken } from '@core/dto/UserToken'
import { CapitalizePipe } from '@shared/pipe/capitalize.pipe'

@Component({
    selector: 'app-nav-user',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, CapitalizePipe],
    templateUrl: './nav-user.component.html',
    styles: [],
})
export class NavUserComponent implements OnInit {
    public user: UserToken | null = null

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.user$.subscribe(user => {
            this.user = user
        })
    }

    logout() {
        this.authService.logout()
    }
}
