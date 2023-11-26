import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-close-icon',
    standalone: true,
    template: `<svg
        fill="none"
        height="100%"
        width="100%"
        class="{{ className }}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12" />
    </svg>`,
})
export class CloseIconComponent {
    @Input({ required: true }) className = ''
}
