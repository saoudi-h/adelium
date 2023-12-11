import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { UserToken } from '@core/dto/UserToken'
import { Store } from '@ngrx/store'
import { AdminIconComponent } from '@shared/components/icons/admin-icon.component'
import { LogoutIconComponent } from '@shared/components/icons/logout-icon.component'
import { ProfileIconComponent } from '@shared/components/icons/profile.component'
import { SettingsIconComponent } from '@shared/components/icons/settings-icon.component'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { SharedModule } from '@shared/shared.module'
import * as AuthActions from '@store/auth/auth.actions'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { Observable } from 'rxjs'
@Component({
    selector: '[nav-user-widget]',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        RouterLink,
        RouterLinkActive,
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

    public user$: Observable<UserToken | null>
    public isAdmin$: Observable<boolean>

    constructor(
        private store: Store,
        private router: Router
    ) {
        this.user$ = this.store.select(AuthSelectors.selectCurrentUser)
        this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin)
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.currentUrl = this.router.url
        })
    }

    logout() {
        this.store.dispatch(AuthActions.logout())
    }
}
