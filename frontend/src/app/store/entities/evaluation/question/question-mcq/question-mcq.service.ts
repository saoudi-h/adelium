import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { QuestionMcq } from '@core/entity/evaluation/question-mcq.entity'
import { GenericService } from '@store/entities/generic/generic.service'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class QuestionMcqService extends GenericService<QuestionMcq> {
    protected apiUrl = `${environment.baseUrl}${environment.questionMcqUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
