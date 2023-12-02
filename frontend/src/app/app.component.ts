import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { initTheme } from '@store/theme/theme.actions'

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    title = 'adelium'

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(initTheme())
    }
}
