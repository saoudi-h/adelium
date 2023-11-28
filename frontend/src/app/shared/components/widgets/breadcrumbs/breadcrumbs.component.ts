import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { BreadcrumbsService } from '@core/services/breadcrumbs.service'
import { IconService } from '@core/services/icon.service'

@Component({
    imports: [CommonModule, RouterLink, RouterLinkActive],
    selector: '[breadcrumb]',
    standalone: true,
    template: `<div class="breadcrumbs text-sm">
        <ul>
            <li>
                <a routerLink="/" routerLinkActive="router-link-active">
                    <div class="h-5 w-5">
                        <ng-container
                            *ngComponentOutlet="getIconComponent('home-icon')">
                        </ng-container>
                    </div>
                </a>
            </li>
            <!-- @for (
                breadcrumb of breadcrumbsService.items$ | async;
                track breadcrumb
            ) { -->
            @for (
                breadcrumb of breadcrumbService.items$ | async;
                track breadcrumb;
                let last = $last
            ) {
                @if (breadcrumb.url !== '') {
                    <li>
                        @if (last) {
                            <div class="h-5 w-5">
                                <ng-container
                                    *ngComponentOutlet="
                                        getIconComponent(breadcrumb.icon)
                                    ">
                                </ng-container>
                            </div>
                            {{ breadcrumb.label }}
                        } @else {
                            <a>
                                <div class="h-5 w-5">
                                    <ng-container
                                        *ngComponentOutlet="
                                            getIconComponent(breadcrumb.icon)
                                        ">
                                    </ng-container>
                                </div>
                                {{ breadcrumb.label }}
                            </a>
                        }
                    </li>
                }
            }
        </ul>
    </div>`,
})
export class BreadcrumbsComponent {
    constructor(
        private iconService: IconService,
        public breadcrumbService: BreadcrumbsService
    ) {}

    getIconComponent(icon: string) {
        return this.iconService.getIconComponent(icon)
    }
}
