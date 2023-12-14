import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { PaginationResult } from '@store/generic/generic.reducer'
import { Observable } from 'rxjs'
import { AdminConfig } from './admin-config.types'

@Component({
    selector: '[view-layout]',
    imports: [CommonModule, SharedModule],
    standalone: true,
    template: ` <!-- Table Section -->
        <section class="flex w-full max-w-[100vw] grow py-10 lg:py-14">
            <div class="w-full overflow-hidden">
                <div
                    class="grid gap-3 border-b border-base-300 px-6 py-4 md:flex md:items-center md:justify-between">
                    <div>
                        <h1 class="text-xl font-semibold text-primary">
                            {{ config.title }}
                        </h1>
                        <p class="text-sm text-base-content">
                            {{ config.subtitle }}
                        </p>
                    </div>

                    <div>
                        <div class="join grid grid-cols-2">
                            <button class="btn btn-outline join-item">
                                Exporter
                            </button>
                            <button
                                class="btn btn-outline join-item"
                                (click)="onAdd()">
                                <svg
                                    class="h-3 w-3 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none">
                                    <path
                                        d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round" />
                                </svg>
                                Ajouter {{ config.masculin ? ' un ' : ' une ' }}
                                {{ config.name }}
                            </button>
                        </div>
                    </div>
                </div>
                <!-- End Header -->
                <!-- Table -->
                <div class="w-full overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="table">
                            <!-- thead  -->
                            <thead class="">
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                class="checkbox" />
                                        </label>
                                    </th>
                                    @for (
                                        label of config.tableLabels;
                                        track label
                                    ) {
                                        <th
                                            class="text-md capitalize text-primary">
                                            {{ label }}
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <ng-content></ng-content>
                        </table>
                    </div>
                    <!-- End Table -->

                    <!-- Footer -->
                    <div
                        class="grid gap-3 border-t border-base-300 px-6 py-4 md:flex md:items-center md:justify-between">
                        <div>
                            <p
                                class="text-sm text-base-content/50"
                                *ngIf="
                                    paginationResult$ | async as pagination;
                                    else noTotal
                                ">
                                {{
                                    pagination.totalElements +
                                        ' ' +
                                        (pagination.totalElements > 1
                                            ? config.plural
                                            : config.name)
                                }}
                            </p>
                            <ng-template #noTotal></ng-template>
                        </div>

                        <div
                            paginator
                            *ngIf="paginationResult$ | async as pagination"
                            [currentPage]="pagination.number + 1"
                            [totalPages]="pagination.totalPages"
                            (pageChange)="onPageChange($event)"></div>
                    </div>
                    <!-- End Footer -->
                </div>
                <!-- End Card -->
            </div>
        </section>
        <!-- End Table Section -->`,
})
export class ViewLayoutComponent {
    @Output() add = new EventEmitter<void>()
    @Output() pageChange = new EventEmitter<number>()

    @Input() config!: AdminConfig
    @Input() paginationResult$!: Observable<PaginationResult>

    onPageChange($event: number) {
        this.pageChange.emit($event)
    }

    onAdd(): void {
        console.log('view add ')
        this.add.emit()
    }
}
