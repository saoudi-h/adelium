import { Component } from '@angular/core'

@Component({
    selector: '[not-found-icon]',
    standalone: true,
    template: `<svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="3"
        stroke="currentColor"
        width="100%"
        height="100%"
        fill="none">
        <path
            d="M39.75,19l-4.92-3.68,4.79-2.84L35.38,7.74H52.16V43.4L40.21,56.26H14.55V7.74H26.68l3.7,4-3.27,3.91,4.54,4-3.84,9.25a.1.1,0,0,0,.14.13Z"
            stroke-linecap="round"></path>
        <polyline points="40.19 56.26 40.21 43.4 52.16 43.4"></polyline>
    </svg>`,
})
export class NotFoundIconComponent {}
