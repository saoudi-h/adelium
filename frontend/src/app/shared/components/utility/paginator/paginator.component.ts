import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PaginationResult } from '@store/generic/generic.reducer'
import { Observable } from 'rxjs'

/**
 * Component for displaying a pagination control.
 */
@Component({
    standalone: true,
    imports: [CommonModule],
    selector: '[paginator]',
    template: `
        @if (pagination$ | async; as pagination) {
            @if (pagination.totalPages > 1) {
                <div class="join">
                    @if (pagination.number > 0) {
                        <button
                            class="btn btn-outline join-item tooltip flex"
                            data-tip="Precedent"
                            (click)="selectPage(pagination.number - 2)">
                            <svg
                                class="h-4 w-4 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span class="hidden md:block">Precedent</span>
                        </button>
                    }
                    @for (
                        page of generatePagination(
                            pagination.number + 1,
                            pagination.totalPages
                        );
                        track page
                    ) {
                        <button
                            (click)="selectPage(page)"
                            [disabled]="page === pagination.number + 1"
                            class="btn btn-square btn-outline join-item">
                            {{ page }}
                        </button>
                    }

                    @if (pagination.number + 1 < pagination.totalPages) {
                        <button
                            class="btn btn-outline join-item tooltip flex"
                            data-tip="Suivant"
                            (click)="selectPage(pagination.number + 2)">
                            <span class="hidden md:block">Suivant</span>
                            <svg
                                class="h-4 w-4 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    }
                </div>
            }
        }
    `,
})
export class PaginatorComponent {
    @Input() pagination$: Observable<PaginationResult> | undefined

    /**
     * Event emitter for page change.
     */
    @Output() pageChange = new EventEmitter<number>()

    /**
     * Selects a page.
     * @param page - The page number or string.
     */
    selectPage(page: number | string): void {
        this.pageChange.emit(Number(page) - 1)
    }

    /**
     * Generates the pagination elements based on the current page and total pages.
     * @param currentPage - The current page number.
     * @param totalPages - The total number of pages.
     * @returns An array of numbers or strings representing the pagination elements.
     */
    generatePagination(
        currentPage: number,
        totalPages: number
    ): (number | string)[] {
        const pages = new Set([1, currentPage, totalPages])
        const thresholds = [2, 5, 10, 25, 50, 100, 250, 500, 1000]

        thresholds.forEach(threshold => {
            const prevPage = currentPage - threshold
            const nextPage = currentPage + threshold

            if (prevPage > 1) pages.add(prevPage)
            if (nextPage < totalPages) pages.add(nextPage)
        })

        return Array.from(pages).sort((a, b) => a - b)
    }
}
