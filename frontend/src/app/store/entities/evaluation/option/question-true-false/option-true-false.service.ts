import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class OptionTrueFalseService extends GenericService<OptionTrueFalse> {
    protected apiUrl = `${environment.baseUrl}${environment.optionTrueFalseUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
