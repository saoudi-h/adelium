import { animate, state, style, transition, trigger } from '@angular/animations'

export const dropdownAnimation = trigger('dropdown', [
    state(
        'closed',
        style({
            height: '0',
            opacity: 0,
            overflow: 'hidden',
        })
    ),
    state(
        'open',
        style({
            height: '*',
            opacity: 1,
        })
    ),
    transition('closed <=> open', animate('300ms ease-in-out')),
])
