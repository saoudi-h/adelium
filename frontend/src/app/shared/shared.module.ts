import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PaginatorComponent } from './components/utility/paginator/paginator.component'
import { CapitalizePipe } from './pipe/capitalize.pipe'
import { DateDistancePipe } from './pipe/dateDistance.pipe'
import { ParseIntPipe } from './pipe/parse-int.pipe'

@NgModule({
    declarations: [
        DateDistancePipe,
        CapitalizePipe,
        ParseIntPipe,
        PaginatorComponent,
    ],
    imports: [CommonModule],
    exports: [
        DateDistancePipe,
        CapitalizePipe,
        ParseIntPipe,
        PaginatorComponent,
    ],
})
export class SharedModule {}
