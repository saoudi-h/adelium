import { Component, Input } from '@angular/core'

@Component({
    selector: '[chevron-icon]',
    standalone: true,
    template: `<svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        class="{{ className }}"
        fill="none">
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7l6 6 6-6"></path>
    </svg>`,
})
export class ChevronIconComponent {
    @Input() className = ''
}
