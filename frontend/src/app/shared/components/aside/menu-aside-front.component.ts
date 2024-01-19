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
import { MenuNode } from '../header/nav-menu/nav-menu.component'
import { MenuAsideFrontService } from './menu-aside-front.service'

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    selector: '[menu-aside-front]',
    template: `
        <!-- aside body -->
        @for (item of menu; track item) {
            <li class="">
                @if (item.type === 'button') {
                    <button
                        (click)="item.action ? item.action() : null"
                        class="justify-between">
                        <div class="h-10 w-10 p-2">
                            @if (item.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            }
                        </div>
                        <span> {{ item.label }} </span>
                    </button>
                } @else if (item.type === 'internal-link') {
                    <a
                        [routerLink]="item.url"
                        routerLinkActive="active"
                        class="justify-between">
                        <div class="h-9 w-9 p-2">
                            @if (item.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            }
                        </div>
                        <span> {{ item.label }} </span>
                    </a>
                } @else if (item.type === 'external-link') {
                    <a
                        [href]="item.url"
                        routerLinkActive="active"
                        class="justify-between">
                        <div class="h-9 w-9 p-2">
                            @if (item.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            }
                        </div>
                        <span> {{ item.label }} </span>
                    </a>
                } @else if (item.type === 'category') {
                    <span
                        class="menu-dropdown-toggle"
                        [ngClass]="
                            menuAsideFrontService.isOpen(item.id)
                                ? 'menu-dropdown-show'
                                : ''
                        "
                        (click)="toggleDropdown($event, item.id)"
                        (keyup)="toggleDropdown($event, item.id)"
                        role="none">
                        <div class="h-10 w-10 p-2">
                            @if (item.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(item.icon)
                                    " />
                            }
                        </div>
                        {{ item.label }}
                    </span>
                    @if (item.subMenu) {
                        <ul
                            menu-aside-front
                            [menu]="item.subMenu"
                            [@subMenuAnimation]="
                                menuAsideFrontService.isOpen(item.id)
                            "></ul>
                    }
                }
            </li>
        }
    `,
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(
                    'li',
                    style({ opacity: 0, transform: 'translateX(-200px)' }),
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
export class MenuAsideFrontComponent {
    @HostBinding('@listAnimation') animation = true
    isAdmin$: Observable<boolean>
    @Input({ required: true }) menu!: MenuNode[]

    constructor(
        private iconService: IconService,
        private store: Store,
        public menuAsideFrontService: MenuAsideFrontService
    ) {
        this.isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin)
    }
    getIconComponent(iconName: string): any {
        return this.iconService.getIconComponent(iconName)
    }

    toggleDropdown(event: Event, id: string) {
        this.menuAsideFrontService.toggle(
            id,
            !this.menuAsideFrontService.isOpen(id)
        )
        event.preventDefault()
    }
}
