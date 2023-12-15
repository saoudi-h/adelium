import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CapitalizePipe } from './pipe/capitalize.pipe'
import { DateDistancePipe } from './pipe/dateDistance.pipe'
import { ParseIntPipe } from './pipe/parse-int.pipe'

@NgModule({
    declarations: [DateDistancePipe, CapitalizePipe, ParseIntPipe],
    imports: [CommonModule],
    exports: [DateDistancePipe, CapitalizePipe, ParseIntPipe],
})
export class SharedModule {}
