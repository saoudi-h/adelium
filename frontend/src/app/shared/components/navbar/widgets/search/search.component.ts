import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SearchIconComponent } from '@shared/components/icons/search-icon.component'

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, SearchIconComponent, CloseIconComponent],
    animations: [
        trigger('searchAnimation', [
            state(
                'closed',
                style({
                    width: '0rem',
                    opacity: 0,
                    transform: 'skewX(60deg)',
                })
            ),
            state(
                'open',
                style({
                    width: '{{ width }}',
                    opacity: 1,
                    transform: 'skewX(0deg)',
                }),
                { params: { width: '18rem' } }
            ),
            transition('closed => open', animate('300ms ease-in')),
            transition('open => closed', animate('150ms ease-out')),
        ]),
    ],
    template: `<form
        action="/search"
        method="get"
        class="relative"
        [ngClass]="{ 'z-10': !alwaysOpen }">
        <!-- input text block  -->
        <div
            [@searchAnimation]="{
                value: isSearchVisible ? 'open' : 'closed',
                params: { width: width }
            }"
            class=" absolute right-0 top-0 transition-all"
            [ngStyle]="{ overflow: isSearchVisible ? 'visible' : 'hidden' }"
            #searchContainer>
            <input
                #searchInput
                class="input w-full appearance-none border-base-content text-base-content outline-none"
                type="search"
                name="q"
                placeholder="Search" />
        </div>
        <label class="btn btn-square btn-ghost swap swap-rotate">
            <!-- this hidden checkbox controls the state -->
            <input
                #toggleInput
                type="checkbox"
                [checked]="isSearchVisible"
                (change)="handleChange()" />

            @if (alwaysOpen) {
                <app-close-icon className="h-6 w-6" />
            } @else {
                <!-- search -->
                <div class="swap-off">
                    <app-search-icon className="h-6 w-6" />
                </div>

                <!-- close -->
                <div class="swap-on">
                    <app-close-icon className="h-6 w-6" />
                </div>
            }
        </label>
    </form>`,
    styles: [],
})
export class SearchComponent implements OnInit {
    @Input() width = '18rem'
    @Input() alwaysOpen: boolean = false
    isSearchVisible = false
    @ViewChild('searchInput') searchInput!: ElementRef

    ngOnInit() {
        // Si le mode toujours ouvert est activé, fixez l'état sur ouvert
        if (this.alwaysOpen) {
            this.isSearchVisible = true
        }
    }
    handleChange() {
        console.log(this.width)
        if (this.alwaysOpen) {
            this.searchInput.nativeElement.value = ''
            return
        }
        this.isSearchVisible = !this.isSearchVisible
        if (this.isSearchVisible) {
            this.searchInput.nativeElement.focus()
        }
    }
}
