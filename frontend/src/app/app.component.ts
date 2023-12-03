import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { appInit } from '@store/app/app.actions'

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    title = 'adelium'

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(appInit())
    }
}
