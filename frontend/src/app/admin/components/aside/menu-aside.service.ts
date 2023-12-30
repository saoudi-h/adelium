import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MenuService {
    private states: { [id: string]: boolean } = {}

    isOpen(id: string): boolean {
        return this.states[id] || false
    }

    toggle(id: string, isOpen: boolean): void {
        this.states[id] = isOpen
    }
}
