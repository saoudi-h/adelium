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
import { ChevronIconComponent } from '../icons/chevron-icon.component'
import { MenuAsideFrontService } from './menu-aside-front.service'

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, ChevronIconComponent],
    selector: '[menu-aside-front]',
    template: `
        <!-- aside body -->
        @if (level === 0) {
            <li>
                <div class="flex flex-col gap-2">
                    <button
                        [ngClass]="{ '-z-10 opacity-0': !isDirty() }"
                        class="btn btn-ghost grow  text-ellipsis whitespace-normal"
                        (click)="closeAll()">
                        <div
                            class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                            <div class="h-10 w-10 p-2">
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent('minimize-icon')
                                    "></ng-container>
                            </div>
                            Réduire le menu
                        </div>
                    </button>
                </div>
            </li>
        }
        @for (item of menu; track item) {
            <li class="relative flex shrink-0 flex-col flex-wrap items-stretch">
                @if (item.hasSubMenu && item.subMenu) {
                    <div
                        class="join !grid grid-flow-col grid-cols-[1fr_auto] items-center justify-between">
                        @if (item.type === 'button') {
                            <button
                                [ngClass]="{
                                    'tooltip flex': item.tooltip !== null
                                }"
                                attr.data-tip="{{ item.tooltip }}"
                                (click)="item.action ? item.action() : null"
                                class="btn btn-ghost join-item grow  text-ellipsis whitespace-normal">
                                <div class="h-10 w-10 p-2">
                                    @if (item.icon) {
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    }
                                </div>
                                <span class="">
                                    {{ item.label }}
                                </span>
                            </button>
                        } @else if (item.type === 'internal-link') {
                            <a
                                [ngClass]="{
                                    'tooltip flex': item.tooltip !== null
                                }"
                                attr.data-tip="{{ item.tooltip }}"
                                [routerLink]="item.url"
                                routerLinkActive="active"
                                class="btn btn-ghost join-item grow  text-ellipsis whitespace-normal">
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
                                [ngClass]="{
                                    'tooltip flex': item.tooltip !== null
                                }"
                                attr.data-tip="{{ item.tooltip }}"
                                [href]="item.url"
                                routerLinkActive="active"
                                class="btn btn-ghost join-item grow  text-ellipsis whitespace-normal">
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
                            <div
                                [ngClass]="{
                                    'tooltip flex': item.tooltip !== null
                                }"
                                attr.data-tip="{{ item.tooltip }}"
                                class="btn btn-ghost join-item grow text-ellipsis whitespace-normal"
                                role="none">
                                <div
                                    class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                                    <div class="h-10 w-10 p-2">
                                        @if (item.icon) {
                                            <ng-container
                                                *ngComponentOutlet="
                                                    getIconComponent(item.icon)
                                                " />
                                        }
                                    </div>

                                    {{ item.label }}
                                </div>
                            </div>
                        }

                        <button
                            class="btn btn-ghost join-item"
                            (click)="toggleDropdown($event, item.id)"
                            (keyup)="toggleDropdown($event, item.id)"
                            for=""
                            tabindex="0">
                            <div
                                class="h-5 w-5"
                                chevron-icon
                                [@rotate]="
                                    isOpen(item.id) ? 'open' : 'closed'
                                "></div>
                        </button>
                    </div>
                    <ul
                        class="relative ml-2 flex flex-col gap-2 border-l border-base-content/50 py-2 pl-2"
                        menu-aside-front
                        [menu]="item.subMenu"
                        [level]="level + 1"
                        [@subMenuAnimation]="
                            menuAsideFrontService.isOpen(item.id)
                        "></ul>
                } @else {
                    @if (item.type === 'button') {
                        <button
                            [ngClass]="{
                                'tooltip flex': item.tooltip !== null
                            }"
                            attr.data-tip="{{ item.tooltip }}"
                            (click)="item.action ? item.action() : null"
                            class="btn btn-ghost grow  text-ellipsis whitespace-normal">
                            <div
                                class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                                <div class="h-10 w-10 p-2">
                                    @if (item.icon) {
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    }
                                </div>
                                {{ item.label }}
                            </div>
                        </button>
                    } @else if (item.type === 'internal-link') {
                        <a
                            [ngClass]="{
                                'tooltip flex': item.tooltip !== null
                            }"
                            attr.data-tip="{{ item.tooltip }}"
                            [routerLink]="item.url"
                            routerLinkActive="active"
                            class="btn btn-ghost grow  text-ellipsis whitespace-normal">
                            <div
                                class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                                <div class="h-10 w-10 p-2">
                                    @if (item.icon) {
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    }
                                </div>
                                {{ item.label }}
                            </div>
                        </a>
                    } @else if (item.type === 'external-link') {
                        <a
                            [ngClass]="{
                                'tooltip flex': item.tooltip !== null
                            }"
                            attr.data-tip="{{ item.tooltip }}"
                            [href]="item.url"
                            routerLinkActive="active"
                            class="btn btn-ghost grow  text-ellipsis whitespace-normal">
                            <div
                                class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                                <div class="h-10 w-10 p-2">
                                    @if (item.icon) {
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    }
                                </div>
                                {{ item.label }}
                            </div>
                        </a>
                    } @else if (item.type === 'category') {
                        <span
                            [ngClass]="{
                                'tooltip flex': item.tooltip !== null
                            }"
                            attr.data-tip="{{ item.tooltip }}"
                            class="btn btn-ghost grow  text-ellipsis whitespace-normal"
                            (click)="toggleDropdown($event, item.id)"
                            (keyup)="toggleDropdown($event, item.id)"
                            role="none">
                            <div
                                class="grid grow select-none auto-cols-[minmax(auto,max-content)_auto_max-content] grid-flow-col content-start items-center justify-between">
                                <div class="h-10 w-10 p-2">
                                    @if (item.icon) {
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(item.icon)
                                            " />
                                    }
                                </div>
                                {{ item.label }}
                            </div>
                        </span>
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
        trigger('rotate', [
            state('open', style({ transform: 'rotate(180deg)' })),
            state('closed', style({ transform: 'rotate(0)' })),
            transition('open <=> closed', animate('300ms ease-in-out')),
        ]),
    ],
})
export class MenuAsideFrontComponent {
    @Input() level = 0
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
    isOpen(id: string) {
        return this.menuAsideFrontService.isOpen(id)
    }
    closeAll() {
        this.menuAsideFrontService.closeAll()
    }
    isDirty(): boolean {
        return this.menuAsideFrontService.isDirty()
    }
}
