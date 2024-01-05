import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class OptionMcqService extends GenericService<OptionMcq> {
    protected apiUrl = `${environment.baseUrl}${environment.optionMcqUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
