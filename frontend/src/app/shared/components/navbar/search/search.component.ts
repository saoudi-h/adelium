import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search.component.html',
    styles: [],
})
export class SearchComponent implements AfterViewInit {
    width = 'w-72'
    isSearchVisible = false
    @ViewChild('searchContainer') searchContainer: ElementRef | undefined
    @ViewChild('toggleInput') toggleInput: ElementRef | undefined

    handleOpen(e: ElementRef) {
        e.nativeElement.classList.remove('opacity-0')
        e.nativeElement.classList.add(this.width)
        e.nativeElement.classList.remove('w-0')
        e.nativeElement.classList.remove('overflow-hidden')
    }
    handleClose(e: ElementRef) {
        e.nativeElement.classList.remove(this.width)
        e.nativeElement.classList.add('w-0')
        e.nativeElement.classList.add('opacity-0')
        e.nativeElement.classList.add('overflow-hidden')
        e.nativeElement.querySelector('input').value = ''
    }

    handleChange() {
        if (!this.searchContainer) return
        this.isSearchVisible = !this.isSearchVisible
        this.isSearchVisible
            ? this.handleOpen(this.searchContainer)
            : this.handleClose(this.searchContainer)
    }
    ngAfterViewInit() {
        if (!this.searchContainer) return
        this.isSearchVisible
            ? this.handleOpen(this.searchContainer)
            : this.handleClose(this.searchContainer)
    }
}
