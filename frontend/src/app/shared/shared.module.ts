import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CapitalizePipe } from './pipe/capitalize.pipe'
import { DateDistancePipe } from './pipe/dateDistance.pipe'

@NgModule({
    declarations: [DateDistancePipe, CapitalizePipe],
    imports: [CommonModule],
    exports: [DateDistancePipe, CapitalizePipe],
})
export class SharedModule {}
