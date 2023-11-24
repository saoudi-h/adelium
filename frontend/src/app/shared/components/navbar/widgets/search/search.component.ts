import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('searchAnimation', [
            state(
                'closed',
                style({
                    width: '0',
                    opacity: 0,
                    overflow: 'hidden',
                    transform: 'skewX(30deg)',
                })
            ),
            state(
                'open',
                style({
                    width: '18rem',
                    opacity: 1,
                    transform: 'skewX(0deg)',
                })
            ),
            transition('closed <=> open', animate('200ms ease-in-out')),
        ]),
    ],
    template: `<form action="/search" method="get" class="relative">
        <label class="btn btn-square btn-ghost swap swap-rotate z-40">
            <!-- this hidden checkbox controls the state -->
            <input
                #toggleInput
                type="checkbox"
                [checked]="isSearchVisible"
                (change)="handleChange()" />

            <!-- search -->
            <svg
                class="swap-off h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <!-- close -->
            <svg
                class="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
        </label>

        <!-- input text block  -->
        <div
            [@searchAnimation]="isSearchVisible ? 'open' : 'closed'"
            class="absolute right-0 top-0 z-30 transition-all"
            #searchContainer>
            <div>
                <input
                    class="input w-full appearance-none border-base-content text-base-content outline-none"
                    type="search"
                    name="q"
                    placeholder="Search" />
            </div>
        </div>
    </form>`,
    styles: [],
})
export class SearchComponent {
    isSearchVisible = false
    // @ViewChild('searchContainer') searchContainer: ElementRef | undefined
    // @ViewChild('toggleInput') toggleInput: ElementRef | undefined

    handleChange() {
        this.isSearchVisible = !this.isSearchVisible
    }
    // ngAfterViewInit() {
    //     if (!this.searchContainer) return
    //     this.isSearchVisible
    //         ? this.handleOpen(this.searchContainer)
    //         : this.handleClose(this.searchContainer)
    // }
}
