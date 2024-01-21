import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class OptionMcqService extends GenericService<OptionMcq> {
    protected apiUrl = `${environment.baseUrl}${environment.optionMcqUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
