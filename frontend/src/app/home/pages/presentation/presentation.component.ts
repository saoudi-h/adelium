import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    selector: '[presentation-page]',
    standalone: true,
    imports: [CommonModule],
    styles: [
        `
            .hero-item 
                transform-origin: top
        `,
    ],
    templateUrl: './presentation.component.html',
})
export class PresentationComponent {}
