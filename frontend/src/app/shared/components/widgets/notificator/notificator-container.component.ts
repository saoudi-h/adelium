import { CommonModule } from '@angular/common'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { ToastContainerDirective, ToastrService } from 'ngx-toastr'

@Component({
    selector: '[notificator-container]',
    standalone: true,
    imports: [CommonModule, SharedModule, ToastContainerDirective],
    template: `
        <div
            aria-live="polite"
            toastContainer
            [class]="'absolute ' + className"></div>
    `,
})
export class NotificatorContainerComponent implements OnInit {
    @Input() className: string = 'right-[22rem] mt-20'
    @ViewChild(ToastContainerDirective, { static: true })
    toastContainer: ToastContainerDirective | undefined

    constructor(private toastrService: ToastrService) {}

    ngOnInit() {
        this.toastrService.overlayContainer = this.toastContainer
    }
}
