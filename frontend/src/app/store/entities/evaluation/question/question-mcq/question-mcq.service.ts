import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class QuestionMcqService extends GenericService<QuestionMcq> {
    protected apiUrl = `${environment.baseUrl}${environment.questionMcqUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
