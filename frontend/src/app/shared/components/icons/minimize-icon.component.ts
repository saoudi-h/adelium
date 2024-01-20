import { Component, Input } from '@angular/core'

@Component({
    selector: '[minimize-icon]',
    standalone: true,
    template: `<svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.5"
        width="100%"
        height="100%"
        class="{{ className }}"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L14 10M14 10H17.75M14 10V6.25"></path>
        <path d="M4 20L10 14M10 14H6.25M10 14V17.75"></path>
        <path
            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"></path>
    </svg>`,
})
export class MinimizeIconComponent {
    @Input() className = ''
}
