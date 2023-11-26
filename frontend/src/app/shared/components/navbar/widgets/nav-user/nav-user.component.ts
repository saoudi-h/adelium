import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { UserToken } from '@core/dto/UserToken'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { CapitalizePipe } from '@shared/pipe/capitalize.pipe'

@Component({
    selector: '[nav-user-widget]',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        CapitalizePipe,
        DropdownComponent,
    ],
    templateUrl: './nav-user.component.html',
    styles: [],
})
export class NavUserWidgetComponent implements OnInit {
    @ViewChild(DropdownComponent) dropdown!: DropdownComponent

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
