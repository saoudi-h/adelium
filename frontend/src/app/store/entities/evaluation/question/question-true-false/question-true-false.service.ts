import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { QuestionTrueFalse } from '@core/entity/evaluation/question-true-false.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class QuestionTrueFalseService extends GenericService<QuestionTrueFalse> {
    protected apiUrl = `${environment.baseUrl}${environment.questionTrueFalseUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
