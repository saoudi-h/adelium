import { Component } from '@angular/core'

@Component({
    standalone: true,
    selector: '[logo-widget]',
    template: ` <a routerLink="/" class="flex items-center text-lg font-black"
        >Adelium</a
    >`,
})
export class LogoWidgetComponent {}
