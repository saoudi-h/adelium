import { Component, HostListener, Input } from '@angular/core'
import { dropdownAnimation } from './dropdown.animations'

@Component({
    standalone: true,
    selector: 'app-dropdown',
    template: `
        <div
            class="dropdown-container"
            (clickOutside)="closeDropdown()"
            [style]="{ width: width }">
            <ng-content select="[dropdown-button]"></ng-content>
            <div
                [@dropdown]="isOpen ? 'open' : 'closed'"
                class="dropdown-content">
                <ng-content select="[dropdown-content]"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./dropdown.component.sass'],
    animations: [dropdownAnimation],
})
export class DropdownComponent {
    @Input() width: string = 'auto'
    isOpen = false

    toggleDropdown() {
        console.log('toggleDropdown:', this.isOpen)
        this.isOpen = !this.isOpen
    }

    closeDropdown() {
        this.isOpen = false
        console.log('toggleDropdown:', this.isOpen)
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler() {
        this.closeDropdown()
    }
}
