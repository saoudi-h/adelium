import { Component } from '@angular/core'

@Component({
    standalone: true,
    selector: 'app-logo',
    template: ` <a routerLink="/" class="flex items-center text-lg font-black"
        >Adelium</a
    >`,
})
export class LogoComponent {}
