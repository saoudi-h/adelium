/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    animate,
    query,
    stagger,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, HostBinding, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { IconService } from '@core/services/icon.service'
import { Store } from '@ngrx/store'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { Observable } from 'rxjs'
import { MenuItem } from './aside.component'
import { MenuService } from './menu-aside.service'

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
                        <span
                            class="menu-dropdown-toggle"
                            [ngClass]="
                                menuService.isOpen(item.id)
                                    ? 'menu-dropdown-show'
                                    : ''
                            "
                            (click)="toggleDropdown($event, item.id)"
                            (keyup)="toggleDropdown($event, item.id)"
                            role="none">
                            <div class="h-10 w-10 p-2">
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            </div>
                            {{ item.text }}
                        </span>
                        <ul
                            menu-aside
                            [menuItems]="item.subMenuItems"
                            [@subMenuAnimation]="
                                menuService.isOpen(item.id)
                            "></ul>
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
        trigger('subMenuAnimation', [
            state(
                'true',
                style({ height: '*', opacity: 1, transform: 'translateX(0%)' })
            ),
            state(
                'false',
                style({
                    height: '0',
                    opacity: 0,
                    transform: 'translateX(-100%)',
                })
            ),
            transition('false <=> true', animate('300ms ease-out')),
        ]),
    ],
})
export class MenuAsideComponent {
    @HostBinding('@listAnimation') animation = true
    isAdmin$: Observable<boolean>
    @Input() menuItems!: MenuItem[]

    constructor(
        private iconService: IconService,
        private store: Store,
        public menuService: MenuService
    ) {
        this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin)
    }
    getIconComponent(iconName: string): any {
        return this.iconService.getIconComponent(iconName)
    }

    toggleDropdown(event: Event, id: string) {
        this.menuService.toggle(id, !this.menuService.isOpen(id))
        event.preventDefault()
    }
}
