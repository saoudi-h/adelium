import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { UserToken } from '@core/dto/UserToken'
import { AdminIconComponent } from '@shared/components/icons/admin-icon.component'
import { LogoutIconComponent } from '@shared/components/icons/logout-icon.component'
import { ProfileIconComponent } from '@shared/components/icons/profile.component'
import { SettingsIconComponent } from '@shared/components/icons/settings-icon.component'
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
        AdminIconComponent,
        ProfileIconComponent,
        SettingsIconComponent,
        LogoutIconComponent,
    ],
    templateUrl: './nav-user.component.html',
    styles: [],
})
export class NavUserWidgetComponent implements OnInit {
    public currentUrl = ''
    dropdownItems = [
        {
            id: 'admin',
            link: '/admin',
            text: 'Administration',
            adminOnly: true,
        },
        {
            id: 'profile',
            link: '/profile',
            text: 'Profile',
            adminOnly: false,
        },
        {
            id: 'settings',
            link: '/settings',
            text: 'Paramétres',
            adminOnly: false,
        },
        {
            id: 'logout',
            isButton: true,
            action: () => this.logout(),
            text: 'Se déconnecter',
            adminOnly: false,
        },
    ]
    @ViewChild(DropdownComponent) dropdown!: DropdownComponent

    public user: UserToken | null = null

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.user$.subscribe(user => {
            this.user = user
        })
        this.router.events.subscribe(() => {
            this.currentUrl = this.router.url
        })
    }

    logout() {
        this.authService.logout()
    }

    isAdmin() {
        return this.authService.isAdmin()
    }
}
