import {
    animate,
    keyframes,
    style,
    transition,
    trigger,
} from '@angular/animations'

export const baseAnimations = [
    trigger('bodyAnimation', [
        transition(':increment', [
            animate(
                '600ms ease-out',
                keyframes([
                    style({
                        transform: 'translateX(0%)',
                        opacity: 1,
                        offset: 0,
                    }),
                    style({
                        transform: 'translateX(-50%)',
                        opacity: 0,
                        offset: 0.5,
                    }),
                    style({
                        transform: 'translateX(0%)',
                        opacity: 0,
                        offset: 0.6,
                    }),
                    style({
                        transform: 'translateX(0)',
                        opacity: 1,
                        offset: 1.0,
                    }),
                ])
            ),
        ]),
        transition(':decrement', [
            animate(
                '600ms ease-out',
                keyframes([
                    style({
                        transform: 'translateX(0%)',
                        opacity: 1,
                        offset: 0,
                    }),
                    style({
                        transform: 'translateX(50%)',
                        opacity: 0,
                        offset: 0.5,
                    }),
                    style({
                        transform: 'translateX(0%)',
                        opacity: 0,
                        offset: 0.6,
                    }),
                    style({
                        transform: 'translateX(0)',
                        opacity: 1,
                        offset: 1.0,
                    }),
                ])
            ),
        ]),
    ]),
    trigger('rowAnimation', [
        transition(':leave', [
            animate(
                '600ms 200ms ease-out',
                keyframes([
                    style({
                        transform: 'translateX(0)',
                        backgroundColor: 'rgba(235, 29, 33, 1)',
                        opacity: 1,
                        offset: 0,
                    }),
                    style({
                        transform: 'translateX(-10%)',
                        backgroundColor: 'rgba(235, 29, 33, 1)',
                        opacity: 0.8,
                        offset: 0.3,
                    }),
                    style({
                        transform: 'translateX(50%)',
                        backgroundColor: 'rgba(235, 29, 33, 1)',
                        opacity: 0,
                        offset: 1.0,
                    }),
                ])
            ),
        ]),
    ]),
]
