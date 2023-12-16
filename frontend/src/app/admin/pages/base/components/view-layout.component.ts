import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AddIconComponent } from '@shared/components/icons/add-icon.component'
import { ExportIconComponent } from '@shared/components/icons/export-icon.component'
import { PaginatorComponent } from '@shared/components/utility/paginator/paginator.component'
import { SharedModule } from '@shared/shared.module'
import { PaginationResult } from '@store/generic/generic.reducer'
import { Observable } from 'rxjs'
import { AdminConfig } from './admin-config.types'

@Component({
    selector: '[view-layout]',
    imports: [
        CommonModule,
        SharedModule,
        PaginatorComponent,
        AddIconComponent,
        AddIconComponent,
        ExportIconComponent,
    ],
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
                                <div export-icon className="h-6 w-6"></div>
                                <div class="hidden sm:flex md:hidden xl:flex">
                                    Exporter
                                </div>
                            </button>
                            <button
                                class="btn btn-outline join-item"
                                (click)="onAdd()">
                                <div add-icon className="h-6 w-6"></div>
                                <div class="hidden sm:flex md:hidden xl:flex">
                                    Ajouter
                                    {{ config.masculin ? ' un ' : ' une ' }}
                                    {{ config.name }}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- End Header -->
                <!-- Table -->
                <div class="w-full overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="table table-zebra-zebra">
                            <!-- thead  -->
                            <thead class="bg-base-300">
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                class="checkbox" />
                                        </label>
                                    </th>
                                    @if (config.tableLabels) {
                                        @for (
                                            label of config.tableLabels;
                                            track label
                                        ) {
                                            <th
                                                class="text-md capitalize text-primary">
                                                {{ label }}
                                            </th>
                                        }
                                    } @else {
                                        @for (field of fields; track field) {
                                            <th
                                                class="text-md capitalize text-primary">
                                                {{ field.label }}
                                            </th>
                                        }
                                    }
                                    <th
                                        class="text-md text-right capitalize text-primary">
                                        Actions
                                    </th>
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
                            [pagination$]="paginationResult$"
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
    @Input() fields: FormField[] | undefined
    @Input() paginationResult$!: Observable<PaginationResult>

    onPageChange($event: number) {
        this.pageChange.emit($event)
    }

    onAdd(): void {
        console.log('view add ')
        this.add.emit()
    }
}
