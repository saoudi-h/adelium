/* eslint-disable @typescript-eslint/no-explicit-any */
import * as AuthSelectors from '@/store/auth/auth.selectors'
import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, HostBinding, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { IconService } from '@core/services/icon.service'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { MenuItem } from './aside.component'

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    selector: '[menu-aside]',
    template: `
        <!-- aside body -->
        @for (item of menuItems; track item) {
            @if (!item.adminOnly || (item.adminOnly && (isAdmin$ | async))) {
                <li class="">
                    @if (item.type === 'button') {
                        <button
                            (click)="item.action ? item.action() : null"
                            class="justify-between">
                            <div class="h-10 w-10 p-2">
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            </div>
                            <span> {{ item.text }} </span>
                        </button>
                    } @else if (item.type === 'link') {
                        <a
                            [routerLink]="item.link"
                            routerLinkActive="active"
                            class="justify-between">
                            <div class="h-9 w-9 p-2">
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            </div>
                            <span> {{ item.text }} </span>
                        </a>
                    } @else if (item.type === 'menu' && item.subMenuItems) {
                        <details>
                            <summary>
                                <div class="h-10 w-10 p-2">
                                    <ng-container
                                        *ngComponentOutlet="
                                            getIconComponent(item.icon)
                                        " />
                                </div>
                                {{ item.text }}
                            </summary>
                            <ul menu-aside [menuItems]="item.subMenuItems"></ul>
                        </details>
                    }
                </li>
            }
        }
    `,
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(
                    'li',
                    style({ opacity: 0, transform: 'translateY(-200px)' }),
                    { optional: true }
                ),
                query(
                    'li',
                    stagger('50ms', [
                        animate(
                            '300ms ease-out',
                            style({ opacity: 1, transform: 'none' })
                        ),
                    ]),
                    { optional: true }
                ),
            ]),
        ]),
    ],
})
export class MenuAsideComponent {
    @HostBinding('@listAnimation') animation = true
    isAdmin$: Observable<boolean>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() menuItems!: MenuItem[]

    constructor(
        private iconService: IconService,
        private store: Store,
        private authSerivce: AuthService
    ) {
        this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin)
    }
    getIconComponent(iconName: string): any {
        return this.iconService.getIconComponent(iconName)
    }
}
