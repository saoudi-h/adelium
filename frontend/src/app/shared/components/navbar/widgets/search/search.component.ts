import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { NotificationService } from '@core/services/notification.service'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SearchIconComponent } from '@shared/components/icons/search-icon.component'

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        CommonModule,
        SearchIconComponent,
        CloseIconComponent,
        ReactiveFormsModule,
    ],
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
        class="relative"
        [formGroup]="searchForm"
        (ngSubmit)="onSubmit()"
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
                class="input w-full appearance-none border-base-200 text-base-content shadow-sm outline-none"
                type="search"
                name="query"
                formControlName="query"
                placeholder="Search" />
        </div>
        <label
            class="btn btn-square btn-ghost swap swap-rotate"
            [ngClass]="{
                '-z-10 opacity-0': alwaysOpen && isEmpty
            }">
            <!-- this hidden checkbox controls the state -->

            <input
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
    isEmpty = true
    @ViewChild('searchInput') searchInput!: ElementRef

    searchForm = this.fb.group({
        query: ['', [Validators.required]],
    })

    /**
     * Initialize the component.
     *
     * @param fb FormBuilder
     * @param notification NotificationService
     * */
    constructor(
        private fb: FormBuilder,
        private notification: NotificationService
    ) {}

    /**
     * Initialize the component.
     * */
    ngOnInit() {
        // Open the search bar if alwaysOpen is true
        if (this.alwaysOpen) {
            this.isSearchVisible = true
        }

        this.searchForm.get('query')?.valueChanges.subscribe(val => {
            this.isEmpty = !val
        })
    }

    /**
     * Submit the form.
     * */
    onSubmit() {
        this.notification.warning(
            'Search Component',
            'Method onSubmit not implemented.'
        )
    }

    /**
     * Handle the change of the search bar.
     * */
    handleChange() {
        if (this.alwaysOpen) {
            this.searchInput.nativeElement.value = ''
            this.isEmpty = true
            return
        }
        this.isSearchVisible = !this.isSearchVisible
        if (this.isSearchVisible) {
            this.searchInput.nativeElement.focus()
        }
    }
}
