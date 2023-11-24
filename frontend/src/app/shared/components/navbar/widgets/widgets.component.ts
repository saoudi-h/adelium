import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { NavUserComponent } from './nav-user/nav-user.component'
import { NotificatorComponent } from './notificator/notificator.component'
import { SearchComponent } from './search/search.component'
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component'

@Component({
    selector: 'app-widgets',
    standalone: true,
    template: ` <div class="flex flex-row">
        <app-theme-switcher />
        <app-search />
        <app-notificator />
        <app-nav-user />
    </div>`,
    imports: [
        CommonModule,
        ThemeSwitcherComponent,
        SearchComponent,
        NavUserComponent,
        NotificatorComponent,
    ],
})
export class WidgetsComponent {}
