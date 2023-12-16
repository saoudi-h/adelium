import { Component } from '@angular/core'

@Component({
    selector: '[authority-icon]',
    standalone: true,
    template: `<svg
        fill="currentColor"
        height="100%"
        width="100%"
        viewBox="0 0 52 52"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="m45.2 29.2h-8.8c-2.6 0-4.8-2.2-4.8-4.8 0.4-7.1 3.7-7.5 4-12.1 0.3-4.8-2.7-9.1-7.4-10.1-6.2-1.3-11.8 3.4-11.8 9.4 0 5.3 3.6 5.3 4 12.8 0 2.6-2.2 4.8-4.8 4.8h-8.8c-2.6 0-4.8 2.1-4.8 4.8v3.2c0 0.9 0.7 1.6 1.6 1.6h44.8c0.9 0 1.6-0.7 1.6-1.6v-3.2c0-2.7-2.2-4.8-4.8-4.8z m0.1 14.4h-38.6c-0.9 0-1.5 0.7-1.5 1.5v0.1c0 2.6 2.2 4.8 4.8 4.8h32.1c2.6 0 4.7-2.2 4.7-4.8v-0.1c0-0.8-0.7-1.5-1.5-1.5z"></path>
    </svg>`,
})
export class AuthorityIconComponent {}