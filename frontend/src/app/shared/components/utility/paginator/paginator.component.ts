import { Component, EventEmitter, Input, Output } from '@angular/core'

/**
 * Component for displaying a pagination control.
 */
@Component({
    selector: '[paginator]',
    template: `
        @if (totalPages > 1) {
            <div class="join">
                @if (currentPage > 1) {
                    <button
                        class="btn btn-outline join-item"
                        (click)="selectPage(1)">
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
                        Precedent
                    </button>
                }
                @for (page of paginationElements; track page) {
                    <button
                        (click)="selectPage(page)"
                        [disabled]="page === currentPage"
                        class="btn btn-square btn-outline join-item">
                        {{ page }}
                    </button>
                }

                @if (currentPage < totalPages) {
                    <button
                        class="btn btn-outline join-item"
                        (click)="selectPage(totalPages)">
                        Suivant
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
    `,
})
export class PaginatorComponent {
    /**
     * The current page number.
     */
    @Input() currentPage: number = 1

    /**
     * The total number of pages.
     */
    @Input() totalPages: number = 1

    /**
     * Event emitter for page change.
     */
    @Output() pageChange = new EventEmitter<number>()

    /**
     * Generates the pagination elements.
     * @returns An array of numbers or strings representing the pagination elements.
     */
    get paginationElements(): (number | string)[] {
        return this.generatePagination(this.currentPage, this.totalPages)
    }

    /**
     * Selects a page.
     * @param page - The page number or string.
     */
    selectPage(page: number | string): void {
        this.pageChange.emit(Number(page))
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
