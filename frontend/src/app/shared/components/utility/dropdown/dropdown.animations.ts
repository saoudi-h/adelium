import {
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations'

export const dropdownAnimation = trigger('dropdown', [
    state(
        'closed',
        style({
            opacity: 0,
            overflow: 'hidden',
        })
    ),
    state(
        'open',
        style({
            opacity: 1,
        })
    ),
    transition(
        'closed => open',
        animate(
            '{{openDuration}}ms ease-out',
            keyframes([
                style({
                    transform: 'translate3d(0, -100%, 0) skewY(-30deg)',
                    opacity: 0,
                }),
                style({
                    transform: 'skewY(20deg)',
                    opacity: 1,
                }),
                style({
                    transform: 'skewY(-5deg)',
                    opacity: 1,
                }),
                style({
                    transform: 'none',
                    opacity: 1,
                }),
            ])
        )
    ),
    transition(
        'open => closed',
        [
            animate(
                '{{closeDuration}}ms ease-out',
                keyframes([
                    style({
                        opacity: 1,
                    }),
                    style({
                        transform: 'translate3d(100%, 0, 0) skewX(30deg)',
                        opacity: 0,
                    }),
                ])
            ),
        ],
        { params: { openDuration: 400, closeDuration: 400 } }
    ),
])
