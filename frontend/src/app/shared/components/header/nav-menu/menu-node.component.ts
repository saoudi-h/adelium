import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, Input, ViewChild } from '@angular/core'
import { RouterLink } from '@angular/router'
import { IconService } from '@core/services/icon.service'
import { ChevronIconComponent } from '@shared/components/icons/chevron-icon.component'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { MenuNode } from './nav-menu.component'

@Component({
    selector: '[menu-node]',
    imports: [
        CommonModule,
        RouterLink,
        DropdownComponent,
        ChevronIconComponent,
    ],
    animations: [
        trigger('rotate', [
            state('open', style({ transform: 'rotate(180deg)' })),
            state('closed', style({ transform: 'rotate(0)' })),
            transition('open <=> closed', animate('300ms ease-in-out')),
        ]),
    ],
    template: ` @if (node.hasSubMenu && node.subMenu) {
            <app-dropdown>
                <div class="join flex justify-center" dropdown-button>
                    @if (node.type === 'button') {
                        <button
                            class="btn btn-ghost join-item grow"
                            [ngClass]="{
                                'tooltip flex': node.tooltip !== null
                            }"
                            attr.data-tip="{{ node.tooltip }}"
                            (click)="node.action ? node.action() : null">
                            @if (node.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(node.icon)
                                    ">
                                </ng-container>
                            }
                            {{ node.label }}
                        </button>
                    } @else if (node.type === 'external-link') {
                        <a
                            class="btn btn-ghost join-item grow"
                            [ngClass]="{
                                'tooltip tooltip-bottom  flex':
                                    node.tooltip !== null
                            }"
                            attr.data-tip="{{ node.tooltip }}"
                            [href]="node.url">
                            @if (node.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent('info-icon')
                                    ">
                                </ng-container>
                            }
                            <div>{{ node.label }}</div>
                        </a>
                    } @else if (node.type === 'internal-link') {
                        <a
                            class="btn btn-ghost join-item grow"
                            [ngClass]="{
                                'tooltip  tooltip-bottom flex':
                                    node.tooltip !== null
                            }"
                            attr.data-tip="{{ node.tooltip }}"
                            [routerLink]="node.url">
                            @if (node.icon) {
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent('info-icon')
                                    ">
                                </ng-container>
                            }
                            {{ node.label }}
                        </a>
                    } @else if (node.type === 'category') {
                        <button
                            class="btn btn-ghost join-item max-w-[19rem] grow"
                            [ngClass]="{
                                'tooltip  tooltip-bottom flex':
                                    node.tooltip !== null
                            }"
                            attr.data-tip="{{ node.tooltip }}">
                            @if (node.icon) {
                                <div class="mr-2 h-5 w-5">
                                    <ng-container
                                        *ngComponentOutlet="
                                            getIconComponent(node.icon)
                                        ">
                                    </ng-container>
                                </div>
                            }
                            <div class="break-word">{{ node.label }}</div>
                        </button>
                    }
                    <button
                        class="btn btn-ghost join-item"
                        (click)="toggleDropdown()"
                        (keydown.enter)="toggleDropdown()"
                        for=""
                        tabindex="0">
                        <div
                            class="h-5 w-5"
                            chevron-icon
                            [@rotate]="isOpen ? 'open' : 'closed'"></div>
                    </button>
                </div>
                <div dropdown-content>
                    <ng-content select="[subMenu]"></ng-content>
                </div>
            </app-dropdown>
        } @else {
            @if (node.type === 'button') {
                <button
                    class="btn btn-ghost"
                    [ngClass]="{
                        'tooltip  tooltip-bottom flex': node.tooltip !== null
                    }"
                    attr.data-tip="{{ node.tooltip }}"
                    (click)="node.action ? node.action() : null">
                    @if (node.icon) {
                        <ng-container
                            *ngComponentOutlet="getIconComponent(node.icon)">
                        </ng-container>
                    }
                    <span class="hidden lg:block">{{ node.label }}</span>
                </button>
            } @else if (node.type === 'external-link') {
                <a
                    class="btn btn-ghost"
                    [ngClass]="{
                        'tooltip  tooltip-bottom flex': node.tooltip !== null
                    }"
                    attr.data-tip="{{ node.tooltip }}"
                    [href]="node.url">
                    @if (node.icon) {
                        <div class="mr-2 h-5 w-5">
                            <ng-container
                                *ngComponentOutlet="
                                    getIconComponent(node.icon)
                                ">
                            </ng-container>
                        </div>
                    }
                    <span class="hidden lg:block">{{ node.label }}</span>
                </a>
            } @else if (node.type === 'internal-link') {
                <a
                    class="btn btn-ghost"
                    [ngClass]="{
                        'tooltip tooltip-bottom  flex': node.tooltip !== null
                    }"
                    attr.data-tip="{{ node.tooltip }}"
                    [routerLink]="node.url">
                    @if (node.icon) {
                        <div class="mr-2 h-5 w-5">
                            <ng-container
                                *ngComponentOutlet="
                                    getIconComponent(node.icon)
                                ">
                            </ng-container>
                        </div>
                    }
                    <span class="hidden lg:block">{{ node.label }}</span>
                </a>
            } @else if (node.type === 'category') {
                <div
                    class="btn btn-ghost"
                    [ngClass]="{
                        'tooltip  tooltip-bottom flex': node.tooltip !== null
                    }"
                    attr.data-tip="{{ node.tooltip }}">
                    @if (node.icon) {
                        <div class="mr-2 h-5 w-5">
                            <ng-container
                                *ngComponentOutlet="
                                    getIconComponent(node.icon)
                                ">
                            </ng-container>
                        </div>
                    }
                    <span class="hidden lg:block">{{ node.label }}</span>
                </div>
            }
        }`,
    standalone: true,
})
export class MenuNodeComponent {
    @Input() node!: MenuNode
    @ViewChild(DropdownComponent) dropdown!: DropdownComponent
    isOpen: boolean = false
    constructor(protected iconService: IconService) {}
    getIconComponent(iconName: string) {
        return this.iconService.getIconComponent(iconName)
    }
    toggleDropdown() {
        this.dropdown.toggleDropdown()
        this.isOpen = this.dropdown.isOpen
    }
}
