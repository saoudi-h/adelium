import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { QuizDefault } from '@core/entity/evaluation/quiz-default.entity'
import { GenericService } from '@store/generic/generic.service'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class QuizDefaultService extends GenericService<QuizDefault> {
    protected apiUrl = `${environment.baseUrl}${environment.quizDefaultUrl}`
    protected serviceUrl = `${environment.baseUrl}${environment.quizServiceUrl}`

    constructor(http: HttpClient) {
        super(http)
    }
}
